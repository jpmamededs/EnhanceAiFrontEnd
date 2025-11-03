import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectItem,
} from '@/components/ui/select';
import { IoChevronDown } from "react-icons/io5";

function SelectUI() {
    return (
        <Select className='font-space-grotesk-medium w-20'>
            <SelectTrigger className='w-full flex flex-row justify-between bg-enhance-black border-2 border-white rounded-xl px-2 py-1.5 hover:border-lime-green transition-colors duration-200'>
                <SelectInput 
                    placeholder="AI" 
                    className='font-space-grotesk-medium text-white text-sm placeholder:text-lightiest-grey border-0 bg-transparent w-10'
                />
                <SelectIcon 
                    as={IoChevronDown} 
                    className='ml-1 text-lime-green'
                />
            </SelectTrigger>
            <SelectPortal>
                <SelectBackdrop className='bg-black/70' />
                <SelectContent className='bg-light-grey'>
                    <SelectDragIndicatorWrapper className='py-1'>
                        <SelectDragIndicator className='bg-lime-green' />
                    </SelectDragIndicatorWrapper>
                    <SelectItem 
                        label="GPT-1" 
                        value="gpt1" 
                        className='font-space-grotesk-light text-white hover:bg-medium-grey rounded-lg px-3 py-2 my-1 transition-colors'
                    />
                    <SelectItem 
                        label="Dall-E" 
                        value="dalle" 
                        className='font-space-grotesk-light text-white hover:bg-medium-grey rounded-lg px-3 py-2 my-1 transition-colors'
                    />
                </SelectContent>
            </SelectPortal>
        </Select>
    )
}

export default SelectUI;