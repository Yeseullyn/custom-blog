'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [newPost, setNewPost] = useState({ title: '', content: '', youtubeUrl: '', categoryId: '' });

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  async function addCategory() {
    await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(newCategory),
      headers: { 'Content-Type': 'application/json' },
    });
    window.location.reload();
  }

  async function deleteCategory(id: number) {
    await fetch('/api/categories', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    window.location.reload();
  }

  async function addPost() {
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: { 'Content-Type': 'application/json' },
    });
    alert('Post added');
    setNewPost({ title: '', content: '', youtubeUrl: '', categoryId: '' });
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Add Category</h2>
        <input className="border p-1 mr-2" placeholder="Name" value={newCategory.name} onChange={e => setNewCategory(c => ({ ...c, name: e.target.value }))} />
        <input className="border p-1 mr-2" placeholder="Slug" value={newCategory.slug} onChange={e => setNewCategory(c => ({ ...c, slug: e.target.value }))} />
        <button onClick={addCategory} className="bg-blue-500 text-white px-3 py-1">Add</button>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Categories</h2>
        {categories.map((cat: any) => (
          <div key={cat.id} className="mb-1">
            {cat.name} <button onClick={() => deleteCategory(cat.id)} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Add Post</h2>
        <input className="border p-1 mr-2" placeholder="Title" value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))} /><br />
        <textarea className="border p-1 w-full my-2" placeholder="Content" value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))} /><br />
        <input className="border p-1 mr-2" placeholder="YouTube URL" value={newPost.youtubeUrl} onChange={e => setNewPost(p => ({ ...p, youtubeUrl: e.target.value }))} /><br />
        <select className="border p-1" value={newPost.categoryId} onChange={e => setNewPost(p => ({ ...p, categoryId: e.target.value }))}>
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button onClick={addPost} className="bg-green-500 text-white px-3 py-1 ml-2">Add Post</button>
      </div>
    </div>
  );
}