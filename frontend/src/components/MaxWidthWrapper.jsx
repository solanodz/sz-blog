/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";

const MaxWidthWrapper = ({
    className,
    children,
}) => {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-screen-xl px-2.5 md:px-30",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
