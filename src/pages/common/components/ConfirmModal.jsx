import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';

export const ConfirmModal = ({
  title,
  description,
  handleClickDisagree,
  handleClickAgree,
  isModalOpened,
}) => {
  return (
    <Dialog open={isModalOpened} onOpenChange={handleClickDisagree}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClickDisagree}>
            취소
          </Button>
          <Button onClick={handleClickAgree} autoFocus>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
