"use client"
import { Category, Style } from '@prisma/client';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTitle, AlertDialogDescription } from './alert-dialog'
import { useModalStore } from '@/hooks/useModalStore';
import { toast } from './use-toast';
import axios from 'axios';

interface AlertModalProps {
    title: string;
    description: string;
    buttonLabel: string;
    cancelLabel: string;
    categoryToDelete?: Category
}

const AlertModal = ({title, description, buttonLabel, cancelLabel, categoryToDelete} : AlertModalProps) => {
  const modalStore = useModalStore()

    async function onDelete(category: Category) {
        console.log(category.name)
        try {
          await axios.delete(`/api/styles/${category.name}`)
          window.location.assign('/dashboard/categories')
          toast({
            title: `Succesfully deleted ${category.name}`
          })
        } catch (error) {
          console.log('[DELETING COLOR]', error)
          toast({
            title: `Could not delete ${category.name}`
          })
        }
    }

    return (
    <AlertDialog open={modalStore.isOpen}>
        <AlertDialogContent className='bg-[#eceaf2]'>
            <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
                {description}
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={modalStore.onClose} className='font-ProBold bg-[#eceaf2]'>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction className='bg-[#AB8F80] font-ProBold'>
                {buttonLabel}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertModal