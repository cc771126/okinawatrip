/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Expense } from '../types';
import { db, isFirebaseConfigured, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Wallet, Trash2, Plus, DollarSign, PiggyBank, RefreshCw } from 'lucide-react';

const JPY_TO_TWD_RATE = 0.21; // 1 JPY = 0.21 TWD (Approx in 2026)

export const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Expense['category']>('food');
  const [amountJpy, setAmountJpy] = useState('');
  const [date, setDate] = useState('2026-07-21');
  const [budgetLimit, setBudgetLimit] = useState('150000'); // Default budget 150K JPY
  const [syncStatus, setSyncStatus] = useState<'offline' | 'synced' | 'connecting'>('offline');

  // Load and Sync expenses
  useEffect(() => {
    if (isFirebaseConfigured && db) {
      setSyncStatus('connecting');
      const expensesCol = collection(db, 'expenses');
      
      const unsubscribe = onSnapshot(expensesCol, (snapshot) => {
        const loadedExpenses: Expense[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          loadedExpenses.push({
            id: docSnap.id,
            date: data.date,
            description: data.description,
            amountJpy: Number(data.amountJpy),
            amountTwd: Number(data.amountTwd),
            category: data.category,
            createdAt: data.createdAt || Date.now()
          });
        });
        // Sort by date / createdAt desc
        loadedExpenses.sort((a, b) => b.createdAt - a.createdAt);
        setExpenses(loadedExpenses);
        setSyncStatus('synced');
      }, (error) => {
        console.error("Firestore Listen Error:", error);
        setSyncStatus('offline');
      });

      return () => unsubscribe();
    } else {
      // Offline LocalStorage Mode
      const stored = localStorage.getItem('okinawa_expenses');
      if (stored) {
        setExpenses(JSON.parse(stored));
      }
      setSyncStatus('offline');
    }
  }, []);

  // Save to LocalStorage helper for offline mode
  const saveOfflineExpenses = (newExpenses: Expense[]) => {
    localStorage.setItem('okinawa_expenses', JSON.stringify(newExpenses));
    setExpenses(newExpenses);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amountJpy) return;

    const jpy = Math.round(Number(amountJpy));
    const twd = Math.round(jpy * JPY_TO_TWD_RATE);
    
    const newExpense: Expense = {
      id: 'exp_' + Math.random().toString(36).substr(2, 9),
      date,
      description,
      amountJpy: jpy,
      amountTwd: twd,
      category,
      createdAt: Date.now()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'expenses', newExpense.id), {
          ...newExpense,
          createdAt: Date.now()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `expenses/${newExpense.id}`);
      }
    } else {
      const updated = [newExpense, ...expenses];
      saveOfflineExpenses(updated);
    }

    // Reset Form
    setDescription('');
    setAmountJpy('');
  };

  const handleDeleteExpense = async (id: string) => {
    if (!window.confirm('確定要刪除這筆花費紀錄嗎？')) return;

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'expenses', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `expenses/${id}`);
      }
    } else {
      const updated = expenses.filter(exp => exp.id !== id);
      saveOfflineExpenses(updated);
    }
  };

  // Calculate stats
  const totalJpy = expenses.reduce((sum, exp) => sum + exp.amountJpy, 0);
  const totalTwd = Math.round(totalJpy * JPY_TO_TWD_RATE);
  const limitNum = Number(budgetLimit) || 150000;
  const percentageOfBudget = Math.min(Math.round((totalJpy / limitNum) * 100), 100);

  const getCategoryEmoji = (cat: Expense['category']) => {
    switch (cat) {
      case 'food': return '🍣 美食';
      case 'shopping': return '🛍️ 購物';
      case 'transport': return '🚗 交通';
      case 'tickets': return '🎟️ 景點';
      case 'stay': return '🏨 住宿';
      default: return '🧩 其他';
    }
  };

  const getCategoryColor = (cat: Expense['category']) => {
    switch (cat) {
      case 'food': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'shopping': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'transport': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'tickets': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'stay': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#1E1E1E] text-[#1E1E1E]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
        <div>
          <h3 className="font-sans font-bold text-xl tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 text-[#4FC3F7]" />
            記帳本 · 日圓即時匯率換算
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            在日本現場記帳，即時折合台幣 (匯率 1 JPY = {JPY_TO_TWD_RATE} TWD)。
          </p>
        </div>

        {/* Sync Status Badge */}
        <div className="flex items-center gap-1.5 self-start">
          {syncStatus === 'synced' ? (
            <span className="text-[10px] bg-green-100 text-green-800 border border-green-300 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              雲端資料庫已同步
            </span>
          ) : syncStatus === 'connecting' ? (
            <span className="text-[10px] bg-blue-100 text-blue-800 border border-blue-300 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              正在同步雲端...
            </span>
          ) : (
            <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              本機儲存 (離線安全)
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Add Expense Form & Stats */}
        <div className="lg:col-span-5 space-y-6">
          {/* Add Expense Form */}
          <form onSubmit={handleAddExpense} className="border-3 border-[#1E1E1E] p-4 rounded-2xl bg-[#F9F6F0] space-y-3">
            <h4 className="font-sans font-bold text-sm text-[#1E1E1E]">➕ 新增一筆花費</h4>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">📅 日期</label>
                <select 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FFFFFE] border-2 border-[#1E1E1E] p-2 rounded-lg text-xs font-mono font-bold"
                >
                  <option value="2026-07-21">7/21 (Day 1)</option>
                  <option value="2026-07-22">7/22 (Day 2)</option>
                  <option value="2026-07-23">7/23 (Day 3)</option>
                  <option value="2026-07-24">7/24 (Day 4)</option>
                  <option value="2026-07-25">7/25 (Day 5)</option>
                  <option value="2026-07-26">7/26 (Day 6)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">🏷️ 分類</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#FFFFFE] border-2 border-[#1E1E1E] p-2 rounded-lg text-xs font-bold"
                >
                  <option value="food">🍣 美食餐飲</option>
                  <option value="shopping">🛍️ 購物買貨</option>
                  <option value="transport">🚗 租車交通</option>
                  <option value="tickets">🎟️ 門票景點</option>
                  <option value="stay">🏨 住宿預訂</option>
                  <option value="other">🧩 其他支出</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">📝 品項描述 (如: 暖暮拉麵)</label>
              <input 
                type="text" 
                placeholder="例如: 沖繩飯糰早餐"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={40}
                required
                className="w-full bg-[#FFFFFE] border-2 border-[#1E1E1E] p-2 rounded-lg text-xs font-medium placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">💴 金額 (日圓 JPY)</label>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="2500"
                  value={amountJpy}
                  onChange={(e) => setAmountJpy(e.target.value)}
                  min="1"
                  required
                  className="w-full bg-[#FFFFFE] border-2 border-[#1E1E1E] p-2 pl-7 rounded-lg text-xs font-mono font-bold focus:outline-none"
                />
                <span className="absolute left-2.5 top-2 text-xs font-mono font-bold text-gray-400">¥</span>
                <span className="absolute right-3 top-2 text-[10px] font-bold text-emerald-600">
                  ≈ NT$ {amountJpy ? Math.round(Number(amountJpy) * JPY_TO_TWD_RATE) : 0}
                </span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#4FC3F7] border-2 border-[#1E1E1E] py-2 rounded-xl text-xs font-sans font-bold hover:bg-[#29B6F6] transition active:scale-[0.98] shadow-[2px_2px_0px_0px_#1E1E1E] flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              新增記帳紀錄
            </button>
          </form>

          {/* Budget Progress Meter */}
          <div className="border-2 border-[#1E1E1E] p-4 rounded-2xl bg-[#FFFFFE] shadow-[3px_3px_0px_0px_#1E1E1E]">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-sans font-bold text-xs flex items-center gap-1">
                <PiggyBank className="w-4 h-4 text-emerald-600" />
                預算上限監控
              </h5>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-500 font-bold">預算: ¥</span>
                <input 
                  type="number" 
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(e.target.value)}
                  className="w-20 border-b border-[#1E1E1E] text-xs font-mono font-bold focus:outline-none text-center"
                />
              </div>
            </div>

            <div className="w-full bg-[#F0EFE9] rounded-full h-4 border-2 border-[#1E1E1E] overflow-hidden relative">
              <div 
                className={`h-full transition-all duration-500 ${
                  percentageOfBudget > 90 ? 'bg-[#E57373]' : percentageOfBudget > 70 ? 'bg-[#FFB300]' : 'bg-[#81C784]'
                }`}
                style={{ width: `${percentageOfBudget}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-1.5 text-[10px] font-bold">
              <span className="text-gray-500">目前花費: {percentageOfBudget}%</span>
              <span className={percentageOfBudget > 95 ? 'text-red-500' : 'text-gray-500'}>
                剩餘預算: ¥ {(Number(budgetLimit) || 150000) - totalJpy}
              </span>
            </div>
          </div>
        </div>

        {/* Right column: Expenses List */}
        <div className="lg:col-span-7 flex flex-col h-[340px] border-3 border-[#1E1E1E] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#1E1E1E] bg-[#FFFFFE]">
          {/* Summary Box */}
          <div className="bg-[#FFD54F] border-b-3 border-[#1E1E1E] p-3 flex justify-around text-center">
            <div>
              <span className="text-[10px] text-gray-700 font-bold">日圓總計 (JPY)</span>
              <div className="font-mono font-extrabold text-base">¥ {totalJpy.toLocaleString()}</div>
            </div>
            <div className="border-l-2 border-[#1E1E1E]/20 h-8 self-center"></div>
            <div>
              <span className="text-[10px] text-gray-700 font-bold">新台幣折合 (TWD)</span>
              <div className="font-mono font-extrabold text-base text-emerald-950">NT$ {totalTwd.toLocaleString()}</div>
            </div>
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 max-h-[260px]">
            {expenses.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-10">
                <DollarSign className="w-8 h-8 text-gray-300 stroke-[1.5]" />
                <p className="text-xs font-medium mt-1">目前還沒有記帳紀錄喔！</p>
                <p className="text-[10px] text-gray-400">趕快填寫左邊表單記錄第一筆吧 💰</p>
              </div>
            ) : (
              expenses.map((exp) => (
                <div key={exp.id} className="border-2 border-[#1E1E1E] rounded-xl p-2.5 flex items-center justify-between hover:bg-[#F9F6F0] transition shadow-[1px_1px_0px_0px_#1E1E1E]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getCategoryColor(exp.category)}`}>
                        {getCategoryEmoji(exp.category)}
                      </span>
                      <span className="font-mono text-[9px] text-gray-400 font-bold">
                        {exp.date.replace('2026-', '')}
                      </span>
                    </div>
                    <h5 className="font-sans font-bold text-xs text-[#1E1E1E]">{exp.description}</h5>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-gray-800">¥ {exp.amountJpy}</div>
                      <div className="font-mono text-[9px] text-gray-400 font-medium">NT$ {exp.amountTwd}</div>
                    </div>
                    <button 
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:border-red-300 border border-transparent rounded-lg transition"
                      title="刪除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
