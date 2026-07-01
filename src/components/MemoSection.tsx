/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Memo } from '../types';
import { db, isFirebaseConfigured, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { FileText, Camera, Trash2, Plus, Sparkles, UploadCloud, RefreshCw } from 'lucide-react';

export const MemoSection: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['待辦']);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'offline' | 'synced' | 'connecting'>('offline');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load and Sync memos
  useEffect(() => {
    if (isFirebaseConfigured && db) {
      setSyncStatus('connecting');
      const memosCol = collection(db, 'memos');
      
      const unsubscribe = onSnapshot(memosCol, (snapshot) => {
        const loadedMemos: Memo[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          loadedMemos.push({
            id: docSnap.id,
            date: data.date || new Date().toISOString().split('T')[0],
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl,
            tags: data.tags || [],
            createdAt: data.createdAt || Date.now()
          });
        });
        // Sort by date / createdAt desc
        loadedMemos.sort((a, b) => b.createdAt - a.createdAt);
        setMemos(loadedMemos);
        setSyncStatus('synced');
      }, (error) => {
        console.error("Firestore Listen Error:", error);
        setSyncStatus('offline');
      });

      return () => unsubscribe();
    } else {
      // Offline LocalStorage Mode
      const stored = localStorage.getItem('okinawa_memos');
      if (stored) {
        setMemos(JSON.parse(stored));
      }
      setSyncStatus('offline');
    }
  }, []);

  // Save to LocalStorage helper for offline mode
  const saveOfflineMemos = (newMemos: Memo[]) => {
    localStorage.setItem('okinawa_memos', JSON.stringify(newMemos));
    setMemos(newMemos);
  };

  // Compress image helper using Canvas to keep size small (~20KB-40KB)
  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // Output as highly compressed JPG
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
    });
  };

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('請上傳圖片/照片檔案格式喔！');
      return;
    }

    setCompressing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        const compressed = await compressImage(e.target.result);
        setImageSrc(compressed);
      }
      setCompressing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleAddTag = () => {
    if (!tagInput || tags.includes(tagInput.trim())) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleAddMemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newMemo: Memo = {
      id: 'memo_' + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      title,
      content,
      tags,
      imageUrl: imageSrc || undefined,
      createdAt: Date.now()
    };

    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'memos', newMemo.id), {
          ...newMemo,
          createdAt: Date.now()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `memos/${newMemo.id}`);
      }
    } else {
      const updated = [newMemo, ...memos];
      saveOfflineMemos(updated);
    }

    // Reset Form
    setTitle('');
    setContent('');
    setImageSrc(null);
    setTags(['待辦']);
  };

  const handleDeleteMemo = async (id: string) => {
    if (!window.confirm('確定要刪除這條備忘錄紀錄嗎？')) return;

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'memos', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `memos/${id}`);
      }
    } else {
      const updated = memos.filter(memo => memo.id !== id);
      saveOfflineMemos(updated);
    }
  };

  return (
    <div className="bg-[#FFFFFE] border-4 border-[#1E1E1E] rounded-3xl p-6 shadow-[5px_5px_0px_0px_#1E1E1E] text-[#1E1E1E]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-6">
        <div>
          <h3 className="font-sans font-bold text-xl tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FFD54F]" />
            備忘錄 ＆ 收據拍照保存
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            記錄行程碎碎念，或拍照/拖曳上傳發票與收據（本機或雲端防遺失保存）。
          </p>
        </div>

        {/* Sync Status Badge */}
        <div className="flex items-center gap-1.5 self-start">
          {syncStatus === 'synced' ? (
            <span className="text-[10px] bg-green-100 text-green-800 border border-green-300 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              雲端同步中
            </span>
          ) : syncStatus === 'connecting' ? (
            <span className="text-[10px] bg-blue-100 text-blue-800 border border-blue-300 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              正在同步...
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
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleAddMemo} className="border-3 border-[#1E1E1E] p-4 rounded-2xl bg-[#F9F6F0] space-y-3">
            <h4 className="font-sans font-bold text-sm text-[#1E1E1E]">📝 撰寫新備忘錄</h4>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">📌 備忘錄標題</label>
              <input 
                type="text" 
                placeholder="例如: 買西松屋清單、小孩防曬"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
                required
                className="w-full bg-[#FFFFFE] border-2 border-[#1E1E1E] p-2 rounded-lg text-xs font-bold placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Tags Box */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">🏷️ 標籤分類</label>
              <div className="flex gap-1.5 mb-2 flex-wrap">
                {tags.map(t => (
                  <span 
                    key={t}
                    onClick={() => handleRemoveTag(t)}
                    className="text-[10px] font-bold bg-[#FFD54F] border border-[#1E1E1E] px-2 py-0.5 rounded cursor-pointer hover:bg-red-200 transition"
                    title="點擊刪除"
                  >
                    #{t} ×
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input 
                  type="text" 
                  placeholder="輸入標籤 (如: 回憶)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  maxLength={10}
                  className="flex-1 bg-[#FFFFFE] border-2 border-[#1E1E1E] p-1.5 rounded-lg text-xs font-medium focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 border-2 border-[#1E1E1E] bg-[#FFFFFE] text-xs font-bold rounded-lg hover:bg-[#F0EFE9]"
                >
                  加
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">💬 詳細內容</label>
              <textarea 
                placeholder="詳細內容或購買清單..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                required
                className="w-full bg-[#FFFFFE] border-2 border-[#1E1E1E] p-2 rounded-lg text-xs font-medium placeholder-gray-400 focus:outline-none resize-none"
              />
            </div>

            {/* Drag & Drop File Upload Field */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">📸 上傳照片 / 發票收據</label>
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[80px] ${
                  isDragOver ? 'bg-[#E3F2FD] border-blue-500' : 'bg-[#FFFFFE] border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />
                
                {compressing ? (
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
                    <span className="text-[10px] text-gray-500 font-bold">正在高速壓縮圖片中...</span>
                  </div>
                ) : imageSrc ? (
                  <div className="relative group">
                    <img src={imageSrc} alt="Thumbnail" className="h-16 w-auto object-contain rounded border border-gray-400" />
                    <span className="text-[9px] text-emerald-600 font-bold block mt-1">✓ 圖片已就緒</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <UploadCloud className="w-6 h-6 stroke-[1.5]" />
                    <span className="text-[10px] font-bold">拖曳圖片到此處，或點擊選擇檔案</span>
                    <span className="text-[8px] text-gray-400 font-medium">(自動智慧壓縮保存)</span>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit"
              disabled={compressing}
              className="w-full bg-[#FFD54F] border-2 border-[#1E1E1E] py-2 rounded-xl text-xs font-sans font-bold hover:bg-[#FBC02D] transition disabled:opacity-50 active:scale-[0.98] shadow-[2px_2px_0px_0px_#1E1E1E] flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              儲存備忘錄
            </button>
          </form>
        </div>

        {/* Right Scrollable Memos */}
        <div className="lg:col-span-7 space-y-4 max-h-[420px] overflow-y-auto pr-1">
          {memos.length === 0 ? (
            <div className="h-48 border-3 border-[#1E1E1E] border-dashed rounded-2xl flex flex-col items-center justify-center text-center text-gray-400 p-6 bg-white">
              <FileText className="w-8 h-8 text-gray-300 stroke-[1.5]" />
              <p className="text-xs font-semibold mt-2">目前沒有備忘錄喔！</p>
              <p className="text-[10px] text-gray-400">趕快利用左邊記錄第一筆，上傳出遊收據吧 📸</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {memos.map((memo) => (
                <div key={memo.id} className="border-3 border-[#1E1E1E] rounded-2xl p-4 bg-[#FFFFFE] shadow-[3px_3px_0px_0px_#1E1E1E] hover:bg-[#FFFDE7]/40 transition flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-1">
                      <span className="font-mono text-[9px] text-gray-400 font-bold">{memo.date}</span>
                      <button 
                        onClick={() => handleDeleteMemo(memo.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition"
                        title="刪除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-sans font-extrabold text-sm text-[#1E1E1E] tracking-tight">{memo.title}</h4>
                    
                    <div className="flex flex-wrap gap-1">
                      {memo.tags.map(t => (
                        <span key={t} className="text-[8px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded border border-amber-200">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-600 font-medium whitespace-pre-wrap leading-relaxed">
                      {memo.content}
                    </p>
                  </div>

                  {memo.imageUrl && (
                    <div className="mt-3 border-2 border-[#1E1E1E] rounded-xl overflow-hidden bg-gray-50 h-28 relative flex items-center justify-center">
                      <img src={memo.imageUrl} alt="Receipt/Photo" className="h-full w-full object-cover" />
                      <div className="absolute bottom-1 right-1 bg-black/60 text-[8px] text-white px-1 py-0.2 rounded flex items-center gap-0.5">
                        <Camera className="w-2.5 h-2.5" />
                        已保存收據
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
