import Link from "next/link"
import { Markdown } from "@/components/shared/markdown"
import { Logo } from "@/components/shared/logo"
import { Container } from "@/components/layout/container"
import { ROUTES } from "@/constants/routes"

// Custom inline SVGs for premium high-fidelity social media icons
const FacebookIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 17.99 4.388 22.954 10.125 23.854V15.469H7.078V11.999H10.125V9.357C10.125 6.35 11.917 4.688 14.658 4.688C15.97 4.688 17.344 4.923 17.344 4.923V7.876H15.83C14.339 7.876 13.874 8.801 13.874 9.75V12H17.202L16.67 15.47H13.874V23.855C19.612 22.954 24 17.989 24 12Z"
      fill="white"
    />
  </svg>
)

const InstagramIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.96 0H17.04C20.88 0 24 3.12 24 6.96V17.04C24 18.8859 23.2667 20.6562 21.9615 21.9615C20.6562 23.2667 18.8859 24 17.04 24H6.96C3.12 24 0 20.88 0 17.04V6.96C0 5.11409 0.733284 3.34379 2.03854 2.03854C3.34379 0.733284 5.11409 0 6.96 0ZM6.72 2.4C5.57427 2.4 4.47546 2.85514 3.6653 3.6653C2.85514 4.47546 2.4 5.57427 2.4 6.72V17.28C2.4 19.668 4.332 21.6 6.72 21.6H17.28C18.4257 21.6 19.5245 21.1449 20.3347 20.3347C21.1449 19.5245 21.6 18.4257 21.6 17.28V6.72C21.6 4.332 19.668 2.4 17.28 2.4H6.72ZM18.3 4.2C18.6978 4.2 19.0794 4.35804 19.3607 4.63934C19.642 4.92064 19.8 5.30218 19.8 5.7C19.8 6.09783 19.642 6.47936 19.3607 6.76066C19.0794 7.04197 18.6978 7.2 18.3 7.2C17.9022 7.2 17.5206 7.04197 17.2393 6.76066C16.958 6.47936 16.8 6.09783 16.8 5.7C16.8 5.30218 16.958 4.92064 17.2393 4.63934C17.5206 4.35804 17.9022 4.2 18.3 4.2ZM12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12C6 10.4087 6.63214 8.88258 7.75736 7.75736C8.88258 6.63214 10.4087 6 12 6ZM12 8.4C11.0452 8.4 10.1295 8.77928 9.45442 9.45442C8.77928 10.1295 8.4 11.0452 8.4 12C8.4 12.9548 8.77928 13.8705 9.45442 14.5456C10.1295 15.2207 11.0452 15.6 12 15.6C12.9548 15.6 13.8705 15.2207 14.5456 14.5456C15.2207 13.8705 15.6 12.9548 15.6 12C15.6 11.0452 15.2207 10.1295 14.5456 9.45442C13.8705 8.77928 12.9548 8.4 12 8.4Z"
      fill="white"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_450_300)">
      <path
        d="M19 0.34375H5C2.239 0.34375 0 2.58275 0 5.34375V19.3438C0 22.1047 2.239 24.3438 5 24.3438H19C21.762 24.3438 24 22.1047 24 19.3438V5.34375C24 2.58275 21.762 0.34375 19 0.34375ZM8 19.3438H5V8.34375H8V19.3438ZM6.5 7.07575C5.534 7.07575 4.75 6.28575 4.75 5.31175Cnan nan 5.534 3.54775 6.5 3.54775Cnan nan 8.25 4.33775 8.25 5.31175Cnan nan 7.467 7.07575 6.5 7.07575ZM20 19.3438H17V13.7397C17 10.3717 13 10.6267 13 13.7397V19.3438H10V8.34375H13V10.1088C14.396 7.52275 20 7.33175 20 12.5848V19.3438Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_450_300">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const TikTokIcon = () => (
  <svg
    width="21"
    height="24"
    viewBox="0 0 21 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.9509 0.02C12.2609 0 13.5609 0.01 14.8609 0C14.9409 1.53 15.4909 3.09 16.6109 4.17C17.7309 5.28 19.3109 5.79 20.8509 5.96V9.99C19.4109 9.94 17.9609 9.64 16.6509 9.02C16.0809 8.76 15.5509 8.43 15.0309 8.09C15.0209 11.01 15.0409 13.93 15.0109 16.84C14.9309 18.24 14.4709 19.63 13.6609 20.78C12.3509 22.7 10.0809 23.95 7.7509 23.99C6.3209 24.07 4.8909 23.68 3.6709 22.96C1.6509 21.77 0.230902 19.59 0.0209017 17.25C0.000901699 16.75 -0.0090983 16.25 0.0109017 15.76C0.190902 13.86 1.1309 12.04 2.5909 10.8C4.2509 9.36 6.5709 8.67 8.7409 9.08C8.7609 10.56 8.7009 12.04 8.7009 13.52C7.8009 13.2 6.7209 13.29 5.8909 13.88C5.3509 14.26 5.0009 14.86 4.8709 15.51C4.7509 16.14 4.7509 16.81 4.9809 17.41C5.2109 18.04 5.6809 18.57 6.2309 18.93C6.8009 19.27 7.4709 19.38 8.1209 19.29C9.1709 19.16 10.0809 18.43 10.4609 17.44C10.5809 17.03 10.6009 16.59 10.6009 16.16C10.5809 11.59 10.6209 7.01 10.5809 2.44L10.9509 0.02Z"
      fill="white"
    />
  </svg>
)

const SnapchatIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_450_306)">
      <path
        d="M23.9771 5.79677C23.976 5.36445 23.9365 4.93308 23.8591 4.50775C23.772 3.98797 23.6079 3.48408 23.3721 3.01273C23.1125 2.51787 22.7748 2.0681 22.3721 1.68071C21.764 1.08635 21.0133 0.658313 20.192 0.437691C19.4376 0.25432 18.6622 0.1716 17.886 0.191687L17.882 0.179688H6.11384V0.191687C5.67212 0.188864 5.23054 0.208557 4.79082 0.250688C4.30984 0.302167 3.83638 0.408872 3.3798 0.568693C2.6273 0.852492 1.95224 1.30957 1.4093 1.90288C0.86637 2.4962 0.47084 3.20907 0.25476 3.98374C0.0731367 4.73172 -0.00957051 5.50028 0.00875581 6.26977L-0.000244141 18.0759C0.00756817 18.6105 0.0439541 19.1443 0.108758 19.675C0.188449 20.235 0.354066 20.7794 0.599764 21.289C0.94687 21.9692 1.43955 22.5647 2.04279 23.033C2.47443 23.3768 2.96323 23.6418 3.48681 23.816C4.25547 24.0538 5.05628 24.1712 5.86084 24.164C6.36485 24.167 6.86785 24.18 7.37086 24.178C11.0309 24.162 14.69 24.204 18.349 24.155C18.8325 24.1446 19.3142 24.0934 19.789 24.002C20.686 23.8431 21.521 23.4372 22.2001 22.83C22.9984 22.1361 23.5562 21.2069 23.7931 20.176C23.9383 19.4856 24.0077 18.7814 24.0001 18.0759V17.9349C24.0001 17.8799 23.9801 5.95477 23.9771 5.79677ZM20.7641 16.9019C20.6101 17.2619 19.834 17.5589 18.52 17.7619C18.397 17.7819 18.345 17.9809 18.274 18.3069C18.244 18.4419 18.214 18.5739 18.174 18.712C18.162 18.7706 18.1289 18.8228 18.081 18.8588C18.0331 18.8947 17.9737 18.9118 17.914 18.907H17.894C17.7681 18.9031 17.6429 18.8874 17.52 18.86C17.1956 18.7924 16.8653 18.7572 16.534 18.755C16.2961 18.7557 16.0586 18.7758 15.824 18.815C15.3282 18.9403 14.8671 19.1758 14.475 19.504C13.8127 20.0706 12.9797 20.3991 12.1089 20.437C12.0589 20.437 12.0109 20.435 11.9749 20.433L11.8869 20.437C11.0166 20.3992 10.184 20.071 9.52189 19.505C9.12956 19.1763 8.66808 18.9404 8.17187 18.815C7.93721 18.7758 7.69977 18.7557 7.46186 18.755C7.13066 18.7592 6.8007 18.7964 6.47685 18.866C6.35416 18.8957 6.22894 18.9138 6.10284 18.92C6.03942 18.9271 5.97563 18.9103 5.92387 18.873C5.87211 18.8356 5.8361 18.7804 5.82284 18.718C5.7838 18.5834 5.75044 18.4473 5.72284 18.3099C5.65084 17.9819 5.59884 17.7819 5.47583 17.7629C4.16282 17.5599 3.3858 17.2619 3.2318 16.8999C3.2154 16.8641 3.20622 16.8253 3.2048 16.7859C3.20165 16.734 3.21791 16.6827 3.25044 16.642C3.28296 16.6014 3.32942 16.5743 3.3808 16.5659C4.46669 16.368 5.44523 15.7863 6.13784 14.9269C6.5182 14.4864 6.83464 13.9946 7.07786 13.4659L7.08186 13.4559C7.15367 13.3388 7.19895 13.2073 7.2145 13.0709C7.23005 12.9344 7.21549 12.7961 7.17186 12.6659C7.00286 12.2659 6.44185 12.0889 6.07184 11.9709C5.98761 11.9456 5.90423 11.9176 5.82184 11.8869C5.49383 11.7569 4.95383 11.4828 5.02583 11.1038C5.08056 10.9611 5.17872 10.8392 5.30647 10.7552C5.43422 10.6712 5.5851 10.6295 5.73784 10.6358C5.81214 10.6339 5.88593 10.6486 5.95384 10.6788C6.23123 10.8193 6.53525 10.8994 6.84585 10.9138C7.03036 10.9265 7.21307 10.8706 7.35886 10.7568C7.34953 10.5815 7.33886 10.4065 7.32686 10.2318C7.15866 9.0479 7.23076 7.84222 7.53886 6.68678C7.90243 5.85784 8.50198 5.15428 9.26275 4.66382C10.0235 4.17336 10.9118 3.9177 11.8169 3.92874L12.1709 3.92574C13.0773 3.9146 13.967 4.17033 14.7291 4.6611C15.4912 5.15187 16.0921 5.85599 16.457 6.68578C16.7652 7.84225 16.8369 9.04899 16.668 10.2338L16.665 10.2908L16.637 10.7578C16.7692 10.8629 16.9342 10.9181 17.103 10.9138C17.3958 10.8927 17.6814 10.8131 17.943 10.6798C18.03 10.6431 18.1236 10.6244 18.218 10.6248C18.3253 10.6236 18.4318 10.644 18.531 10.6848L18.536 10.6868C18.6487 10.7135 18.7508 10.7733 18.8292 10.8585C18.9076 10.9436 18.9588 11.0504 18.976 11.1648C18.98 11.3488 18.844 11.6229 18.173 11.8879C18.091 11.9186 18.0079 11.9466 17.924 11.9719C17.553 12.0899 16.993 12.2679 16.824 12.6669C16.7805 12.797 16.766 12.935 16.7816 13.0713C16.7971 13.2076 16.8423 13.3389 16.914 13.4559L16.918 13.4659C17.2536 14.2326 17.762 14.9113 18.4033 15.4491C19.0446 15.9868 19.8016 16.3691 20.6151 16.5659C20.6664 16.5743 20.7129 16.6014 20.7454 16.642C20.7779 16.6827 20.7942 16.734 20.7911 16.7859C20.7899 16.826 20.7807 16.8655 20.7641 16.9019Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_450_306">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const DESCRIPTION_MD = `Helping individuals navigate the complexities of road traffic accident claims with modern technology and human care. We specialize in recovering what's rightfully yours.`

const COMPANY_INFO_MD = `Northridge Solutions Ltd T/A My Claims Online | FCA FRN: XXXXXXX | Company No: **17154158**`

const REGISTERED_ADDRESS_MD = `**Registered Address:** Ground Floor, Citygate Longridge Road Preston PR2 5BQ`

const DISCLAIMER_MD = `**Disclaimer:** My Claims Online is a Claims Management Company that is authorised and regulated by the Financial Conduct Authority (FCA) under Firm Reference Number XXXXXX. Our FCA-regulated activity is limited to the referral of clients to our panel of personal injury solicitors. All other services we provide including vehicle replacement, repair management, and roadside recovery — are not regulated by the FCA.`

export function Footer() {
  return (
    <footer className="border-t-4 border-[#A3E635] bg-primary pt-16 pb-10 font-sans text-white">
      <Container>
        {/* Main top grid */}
        <div className="flex flex-col gap-12 pb-12 lg:flex-row lg:justify-between lg:gap-8">
          {/* Left Column */}
          <div className="flex max-w-lg flex-col">
            <Logo className="h-6 w-auto" />
            <Markdown
              content={DESCRIPTION_MD}
              className="mt-6 text-[14px] leading-relaxed text-white/80 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white"
            />
            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-5">
              <FacebookIcon />
              <InstagramIcon />
              <LinkedInIcon />
              <TikTokIcon />
              <SnapchatIcon />
            </div>
          </div>

          {/* Right Columns (Links aligned right) */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-6 pr-4 text-[14px] font-medium lg:gap-x-24 lg:pr-8">
            <div className="flex flex-col gap-5">
              <Link
                href={ROUTES.LEGAL.PRIVACY_POLICY}
                className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
              >
                Privacy Policy
              </Link>
              <Link
                href={ROUTES.LEGAL.COMPLAINTS}
                className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
              >
                Complaints
              </Link>
            </div>
            <div className="flex flex-col gap-5">
              <Link
                href={ROUTES.LEGAL.TERMS_OF_SERVICE}
                className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
              >
                Terms of Service
              </Link>
              <Link
                href={ROUTES.LEGAL.COOKIE_POLICY}
                className="whitespace-nowrap text-white/90 transition-colors hover:text-[#A3E635]"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle separator */}
        <div className="border-t border-white/10 pt-8" />

        {/* Bottom Metadata & Disclaimer Section */}
        <div className="flex flex-col gap-8 text-xs leading-relaxed text-white/70 lg:flex-row lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3.5">
            <Markdown
              content={COMPANY_INFO_MD}
              className="text-xs leading-relaxed text-white/80 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white"
            />
            <Markdown
              content={REGISTERED_ADDRESS_MD}
              className="text-xs leading-relaxed text-white/80 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white"
            />
            <Markdown
              content={DISCLAIMER_MD}
              className="mt-2 text-xs leading-relaxed text-white/50 [&_p]:m-0 [&_strong]:font-semibold [&_strong]:text-white/85"
            />
          </div>

          <div className="flex items-end lg:text-right">
            <p className="text-[13px] font-semibold tracking-wide whitespace-nowrap text-[#A3E635]">
              © 2024 ClaimIt Inc. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
