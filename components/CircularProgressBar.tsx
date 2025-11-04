import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, View } from 'react-native';

interface CircularProgressBarProps {
    score?: number;
    sizeValue?: number;
    widthValue?: number;
    fontSize?: number;
}

function CircularProgressBar({ score = 0, sizeValue = 0, widthValue = 0, fontSize = 0 }: CircularProgressBarProps) {

    return (
        <AnimatedCircularProgress
            size={sizeValue || 120}
            width={widthValue || 15}
            fill={score}
            tintColor="#e7ff32ff"
            lineCap="round"
            backgroundColor="#eeeeeeff">
            {(fill: number) => (
                <Text style={{ fontSize: fontSize || sizeValue/5, fontWeight: 'bold', color: '#101010' }} className='font-space-grotesk-medium'>
                    {fill}
                </Text>
            )}
        </AnimatedCircularProgress>
    )
}

export default CircularProgressBar;