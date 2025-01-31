"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
export const ProModal = () => {
  const proModal = useProModal();

  const onClick = () => {
    // eslint-disable-next-line no-console
    console.log("yohuu");
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/hero.svg" alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Upgrade to MCQs Pro Today!</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of MCQs
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited MCQs</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            // disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant="default"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
