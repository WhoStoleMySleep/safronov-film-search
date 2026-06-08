'use client';
import React from 'react';
import Popup from '@/components/Popup/Popup';

export default function PopupMenu({ onClose, isOpen }) {
  return <Popup name="popup-menu" onClose={onClose} isOpen={isOpen} />;
}
