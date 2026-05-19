import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/constants/routes"

export const Logo = ({ href = ROUTES.HOME, className, containerClassName }: { href?: string, className?: string, containerClassName?: string }) => {
    return (
        <Link href={href} className={cn("flex items-center gap-2", containerClassName)}>
            <Image
                src="/logo.avif"
                alt="MyClaims Online"
                width={120}
                height={36}
                className={cn("h-6 w-auto", className)}
                priority
            />
        </Link>
    )
}