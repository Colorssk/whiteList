import {
    useState,
    useMemo
} from 'react';
export const useHover = () => {
    const [isHovered, setHovered] = useState();

    const eventHandlers = useMemo(() => ({
        onMouseOver() {
            setHovered(true);
        },
        onMouseOut() {
            setHovered(false);
        }
    }), []);

    return [isHovered, eventHandlers];
};