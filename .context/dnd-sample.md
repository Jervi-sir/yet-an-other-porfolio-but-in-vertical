import React, { useState, useCallback } from 'react';

interface Item {
    id: number;
    title: string;
}

export default function DragAndDropSample() {
    // 1. Initial Data
    const [items, setItems] = useState<Item[]>([
        { id: 1, title: 'Introduction to React' },
        { id: 2, title: 'State Management' },
        { id: 3, title: 'Component Lifecycle' },
        { id: 4, title: 'Hooks Deep Dive' },
        { id: 5, title: 'Routing Basics' },
    ]);

    // 2. Drag State
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const [dropTargetId, setDropTargetId] = useState<number | null>(null);
    const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null);

    // 3. Drag Handlers
    const handleDragStart = (id: number, e: React.DragEvent) => {
        setDraggingId(id);
        e.dataTransfer.effectAllowed = 'move';
        // Required for Firefox compatibility:
        e.dataTransfer.setData('text/plain', id.toString());
    };

    const handleDragOver = (id: number, e: React.DragEvent) => {
        // Required to allow dropping
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (draggingId === null || draggingId === id) return;

        // Calculate whether to drop above or below the hovered target
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const position = e.clientY < midY ? 'before' : 'after';

        setDropTargetId(id);
        setDropPosition(position);
    };

    const handleDragEnd = () => {
        setDraggingId(null);
        setDropTargetId(null);
        setDropPosition(null);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        if (draggingId === null || dropTargetId === null || dropPosition === null || draggingId === dropTargetId) {
            handleDragEnd();
            return;
        }

        const currentItems = [...items];
        const draggedIndex = currentItems.findIndex(item => item.id === draggingId);
        const targetIndex = currentItems.findIndex(item => item.id === dropTargetId);

        if (draggedIndex === -1 || targetIndex === -1) {
            handleDragEnd();
            return;
        }

        // Remove the dragged item
        const [draggedItem] = currentItems.splice(draggedIndex, 1);
        
        // Recalculate target index after removal
        const newTargetIndex = currentItems.findIndex(item => item.id === dropTargetId);
        
        // Insert item at the new position
        const insertIndex = dropPosition === 'after' ? newTargetIndex + 1 : newTargetIndex;
        currentItems.splice(insertIndex, 0, draggedItem);

        setItems(currentItems);
        handleDragEnd();
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Draggable List</h2>
            
            <div className="flex flex-col gap-2">
                {items.map((item) => {
                    const isDragging = draggingId === item.id;
                    const isDropTarget = dropTargetId === item.id;

                    return (
                        <div
                            key={item.id}
                            onDragOver={(e) => handleDragOver(item.id, e)}
                            onDrop={handleDrop}
                            className={`
                                relative flex items-center gap-3 p-3 bg-gray-50 border rounded-lg transition-all
                                ${isDragging ? 'opacity-40 scale-[0.98] border-blue-400' : 'border-gray-200'}
                                ${isDropTarget && dropPosition === 'before' ? 'border-t-2 border-t-blue-500 rounded-t-none ring-1 ring-blue-100' : ''}
                                ${isDropTarget && dropPosition === 'after'  ? 'border-b-2 border-b-blue-500 rounded-b-none ring-1 ring-blue-100' : ''}
                            `}
                        >
                            {/* Visual line indicator for "before" */}
                            {isDropTarget && dropPosition === 'before' && (
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 -mt-0.5" />
                            )}

                            {/* Drag Handle */}
                            <div
                                draggable
                                onDragStart={(e) => handleDragStart(item.id, e)}
                                onDragEnd={handleDragEnd}
                                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded text-gray-400"
                            >
                                {/* Simple grip icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>
                                </svg>
                            </div>

                            <span className="font-medium text-gray-700">{item.title}</span>

                            {/* Visual line indicator for "after" */}
                            {isDropTarget && dropPosition === 'after' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 -mb-0.5" />
                            )}
                        </div>
                    );
                })}
            </div>
            {items.length === 0 && (
                 <div className="text-gray-400 text-center py-4 text-sm">No items.</div>
            )}
        </div>
    );
}
