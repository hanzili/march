"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/atoms/Tooltip"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import { BACKEND_URL } from "../lib/constants/urls"
import { type User } from "../lib/@types/auth/user"
import Image from "next/image"

const navLinkClassName =
  "flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm text-secondary-foreground cursor-pointer hover:bg-background-hover"

const SidebarLink = ({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link className={navLinkClassName} href={href}>
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const Sidebar: React.FC = () => {
  const pathname = usePathname()

  if (pathname.includes("auth")) {
    return null
  }

  const { session } = useAuth()

  const { data } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        })
        return data as User
      } catch (error) {
        return error
      }
    },
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="flex flex-col justify-between px-3 pb-3 pt-14 border border-border bg-secondary">
      <div className="flex flex-col gap-0.5">
        <SidebarLink
          href="/app/inbox/"
          icon={
            <svg
              width="27"
              height="26"
              viewBox="0 0 27 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.71699 6.6433C4.17453 4.66064 6.00068 3.25 8.10983 3.25H18.8903C20.9994 3.25 22.8256 4.66064 23.2832 6.6433L23.4484 7.35981C24.3058 11.0746 24.3058 14.9254 23.4484 18.6402L23.2832 19.3567C22.8256 21.3394 20.9994 22.75 18.8903 22.75H8.10983C6.00068 22.75 4.17453 21.3394 3.71699 19.3567L3.55164 18.6402C2.69438 14.9254 2.69438 11.0746 3.55164 7.35981L3.71699 6.6433Z"
                stroke={pathname === "/app/inbox/" ? "#000" : "#676767"}
                strokeWidth="2.08333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.81201 14.0835H9.94208C9.94208 15.1668 11.0367 17.3335 13.7731 17.3335C16.5097 17.3335 17.6042 15.1668 17.6042 14.0835H24.187"
                stroke={pathname === "/app/inbox/" ? "#000" : "#676767"}
                strokeWidth="2.08333"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="inbox"
        />
        <SidebarLink
          href="/app/today/"
          icon={
            <svg
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="28" height="27" fill="none" />
              <path
                d="M8.54306 9.89433C8.96106 9.48393 9.63138 9.09698 10.6103 9.09698C11.9509 9.09698 12.8614 9.92365 13.1912 10.9115C13.5135 11.873 13.3098 13.0515 12.4267 13.843C12.0894 14.1315 11.7285 14.3932 11.3475 14.6257L11.3064 14.652C10.9796 14.8537 10.6645 15.0724 10.3625 15.3072C9.98706 15.615 9.69066 15.958 9.54322 16.4314H12.4799C12.6814 16.4314 12.8747 16.5086 13.0173 16.6461C13.1598 16.7835 13.2399 16.9699 13.2399 17.1643C13.2399 17.3586 13.1598 17.545 13.0173 17.6825C12.8747 17.8199 12.6814 17.8971 12.4799 17.8971H8.67986C8.4783 17.8971 8.28499 17.8199 8.14246 17.6825C7.99993 17.545 7.91986 17.3586 7.91986 17.1643C7.91986 15.7352 8.58866 14.8382 9.37602 14.1918C9.72866 13.9031 10.1117 13.6568 10.4431 13.4443L10.5039 13.4047C10.8687 13.1717 11.159 12.9797 11.39 12.773C11.5813 12.594 11.7161 12.3665 11.7791 12.1167C11.842 11.867 11.8304 11.6052 11.7457 11.3615C11.6772 11.1246 11.5278 10.917 11.3218 10.772C11.1158 10.6271 10.8651 10.5533 10.6103 10.5627C10.0919 10.5627 9.79706 10.7532 9.6253 10.9218C9.53063 11.0143 9.45255 11.1212 9.39426 11.2384L9.39122 11.2457C9.32128 11.428 9.1791 11.5761 8.99595 11.6573C8.8128 11.7385 8.60369 11.7463 8.41462 11.6788C8.22556 11.6114 8.07202 11.4743 7.98778 11.2977C7.90355 11.1211 7.89552 10.9194 7.96546 10.7371L8.00802 10.6345C8.03234 10.5857 8.06629 10.5221 8.10986 10.444C8.20106 10.2915 8.33938 10.0922 8.54306 9.89433ZM16.2799 9.10285C16.4814 9.10285 16.6747 9.18006 16.8173 9.3175C16.9598 9.45493 17.0399 9.64134 17.0399 9.8357V12.7671H18.5599V9.8357C18.5599 9.64134 18.6399 9.45493 18.7825 9.3175C18.925 9.18006 19.1183 9.10285 19.3199 9.10285C19.5214 9.10285 19.7147 9.18006 19.8573 9.3175C19.9998 9.45493 20.0799 9.64134 20.0799 9.8357V17.1643C20.0799 17.3586 19.9998 17.545 19.8573 17.6825C19.7147 17.8199 19.5214 17.8971 19.3199 17.8971C19.1183 17.8971 18.925 17.8199 18.7825 17.6825C18.6399 17.545 18.5599 17.3586 18.5599 17.1643V14.2328H16.2799C16.0783 14.2328 15.885 14.1556 15.7425 14.0182C15.5999 13.8808 15.5199 13.6944 15.5199 13.5V9.8357C15.5199 9.64134 15.5999 9.45493 15.7425 9.3175C15.885 9.18006 16.0783 9.10285 16.2799 9.10285ZM7.15986 3.23999C6.15204 3.23999 5.1855 3.62605 4.47286 4.31323C3.76022 5.00042 3.35986 5.93245 3.35986 6.90428V20.0957C3.35986 21.0675 3.76022 21.9996 4.47286 22.6867C5.1855 23.3739 6.15204 23.76 7.15986 23.76H20.8399C21.8477 23.76 22.8142 23.3739 23.5269 22.6867C24.2395 21.9996 24.6399 21.0675 24.6399 20.0957V6.90428C24.6399 5.93245 24.2395 5.00042 23.5269 4.31323C22.8142 3.62605 21.8477 3.23999 20.8399 3.23999H7.15986ZM4.87986 6.90428C4.87986 6.32118 5.12008 5.76196 5.54766 5.34965C5.97524 4.93734 6.55517 4.7057 7.15986 4.7057H20.8399C21.4446 4.7057 22.0245 4.93734 22.4521 5.34965C22.8796 5.76196 23.1199 6.32118 23.1199 6.90428V20.0957C23.1199 20.6788 22.8796 21.238 22.4521 21.6503C22.0245 22.0626 21.4446 22.2943 20.8399 22.2943H7.15986C6.55517 22.2943 5.97524 22.0626 5.54766 21.6503C5.12008 21.238 4.87986 20.6788 4.87986 20.0957V6.90428Z"
                fill={pathname === "/app/today/" ? "#000" : "#676767"}
              />
            </svg>
          }
          label="today"
        />
        <hr className="my-3 border-border" />
        <SidebarLink
          href="/app/space/"
          icon={
            <svg
              width="29"
              height="27"
              viewBox="0 0 29 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.4741 9.44994C23.3945 9.44945 24.2806 9.7749 24.9527 10.3603C25.6248 10.9457 26.0326 11.7472 26.0933 12.6022L26.1005 12.8236V20.9236C26.1007 21.7805 25.7508 22.6053 25.1217 23.2308C24.4927 23.8563 23.6317 24.2356 22.7133 24.2918L22.4755 24.2986H13.7755C12.8552 24.2987 11.9693 23.9729 11.2974 23.3873C10.6256 22.8016 10.2182 22 10.1578 21.145L10.1505 20.9236V12.8236C10.1504 11.9667 10.5003 11.1419 11.1294 10.5164C11.7584 9.89088 12.6194 9.51155 13.5377 9.45534L13.7741 9.44994H22.4741ZM18.1255 12.1499C17.9559 12.1499 17.7915 12.2053 17.6612 12.3064C17.5308 12.4075 17.4427 12.548 17.4121 12.7034L17.4005 12.8249V16.1999H13.7741L13.6436 16.2094C13.4764 16.2376 13.3252 16.3195 13.2163 16.4409C13.1074 16.5623 13.0478 16.7154 13.0478 16.8736C13.0478 17.0318 13.1074 17.1849 13.2163 17.3063C13.3252 17.4277 13.4764 17.5096 13.6436 17.5378L13.7741 17.5486H17.3991V20.9236L17.4107 21.0451C17.441 21.2007 17.529 21.3415 17.6594 21.4429C17.7897 21.5443 17.9542 21.5998 18.1241 21.5998C18.294 21.5998 18.4585 21.5443 18.5888 21.4429C18.7192 21.3415 18.8072 21.2007 18.8375 21.0451L18.8491 20.9249V17.5499H22.4741L22.6046 17.5391C22.7718 17.511 22.923 17.429 23.0319 17.3076C23.1408 17.1862 23.2004 17.0331 23.2004 16.8749C23.2004 16.7168 23.1408 16.5636 23.0319 16.4422C22.923 16.3209 22.7718 16.2389 22.6046 16.2107L22.4741 16.1999H18.8491V12.8249L18.8375 12.7034C18.807 12.548 18.7188 12.4075 18.5885 12.3064C18.4581 12.2053 18.2938 12.1499 18.1241 12.1499M18.359 4.98684L18.4286 5.20014L19.2623 8.09859H13.0505C11.941 8.09854 10.8734 8.49323 10.0661 9.20193C9.25879 9.91062 8.77289 10.8797 8.7078 11.911L8.70055 12.1486V19.3684C7.95975 19.3538 7.24155 19.1282 6.64268 18.7219C6.04381 18.3157 5.59303 17.7484 5.35105 17.0963L5.27565 16.8668L3.0238 9.04359C2.78524 8.21599 2.89373 7.33489 3.32726 6.57902C3.76079 5.82315 4.4869 5.24911 5.3583 4.97334L5.5874 4.90989L13.9901 2.81334C14.8397 2.60132 15.743 2.68408 16.5318 3.04621C17.3207 3.40833 17.9412 4.02512 18.2778 4.78164L18.359 4.98684Z"
                fill={pathname === "/app/space/" ? "#000" : "#676767"}
              />
            </svg>
          }
          label="space"
        />
        <SidebarLink
          href="/app/audio/"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.6665 8.33333V10.8333M4.99984 5V14.1667M8.33317 2.5V17.5M11.6665 6.66667V12.5M14.9998 4.16667V15M18.3332 8.33333V10.8333"
                stroke={pathname === "/app/audio/" ? "#000" : "#676767"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="audio"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <SidebarLink
          href="/app/profile/"
          icon={
            <Image
              src={data ? data.avatar : "/icons/user.jpg"}
              alt="profile"
              width={26}
              height={26}
              className="rounded-full bg-gray-color"
            />
          }
          label="profile"
        />
        <SidebarLink
          href="/app/settings/"
          icon={
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0668 6.20845L19.5858 5.39468C19.2221 4.77924 19.0403 4.47152 18.7308 4.34881C18.4214 4.22611 18.0714 4.32293 17.3715 4.51658L16.1826 4.8431C15.7358 4.94357 15.2669 4.88657 14.8589 4.68218L14.5307 4.49752C14.1808 4.27903 13.9117 3.95689 13.7627 3.57823L13.4374 2.63072C13.2234 2.0037 13.1164 1.69019 12.8617 1.51086C12.6071 1.33154 12.2688 1.33154 11.5922 1.33154H10.506C9.82951 1.33154 9.49121 1.33154 9.23651 1.51086C8.98187 1.69019 8.87489 2.0037 8.66095 2.63072L8.33556 3.57823C8.1866 3.95689 7.91748 4.27903 7.56761 4.49752L7.23937 4.68218C6.83135 4.88657 6.36254 4.94357 5.91569 4.8431L4.72675 4.51658C4.02683 4.32293 3.67688 4.22611 3.36745 4.34881C3.05801 4.47152 2.87616 4.77924 2.51243 5.39468L2.03151 6.20845C1.69057 6.78533 1.5201 7.07378 1.55319 7.38084C1.58626 7.6879 1.81448 7.93535 2.2709 8.43024L3.2755 9.52529C3.52104 9.82834 3.69536 10.3565 3.69536 10.8314C3.69536 11.3065 3.52109 11.8345 3.27553 12.1377L2.2709 13.2328C1.81448 13.7277 1.58627 13.9751 1.55319 14.2822C1.5201 14.5893 1.69057 14.8777 2.03151 15.4545L2.51242 16.2683C2.87614 16.8837 3.05801 17.1915 3.36745 17.3142C3.67688 17.4369 4.02684 17.3401 4.72677 17.1464L5.91565 16.8199C6.36258 16.7194 6.83148 16.7765 7.23954 16.9809L7.56773 17.1656C7.91754 17.3841 8.18659 17.7061 8.33553 18.0848L8.66095 19.0324C8.87489 19.6594 8.98187 19.9729 9.23651 20.1523C9.49121 20.3315 9.82951 20.3315 10.506 20.3315H11.5922C12.2688 20.3315 12.6071 20.3315 12.8617 20.1523C13.1164 19.9729 13.2234 19.6594 13.4374 19.0324L13.7628 18.0848C13.9117 17.7061 14.1807 17.3841 14.5306 17.1656L14.8587 16.9809C15.2668 16.7765 15.7357 16.7194 16.1826 16.8199L17.3715 17.1464C18.0714 17.3401 18.4214 17.4369 18.7308 17.3142C19.0403 17.1915 19.2221 16.8837 19.5858 16.2683L20.0668 15.4545C20.4077 14.8777 20.5781 14.5893 20.5451 14.2822C20.512 13.9751 20.2838 13.7277 19.8274 13.2328L18.8227 12.1377C18.5772 11.8345 18.4029 11.3065 18.4029 10.8314C18.4029 10.3565 18.5773 9.82834 18.8227 9.52529L19.8274 8.43024C20.2838 7.93535 20.512 7.6879 20.5451 7.38084C20.5781 7.07378 20.4077 6.78533 20.0668 6.20845Z"
                stroke={pathname === "/app/settings/" ? "#000" : "#676767"}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14.5491 10.8315C14.5491 12.7645 12.9821 14.3315 11.0491 14.3315C9.11611 14.3315 7.54913 12.7645 7.54913 10.8315C7.54913 8.89854 9.11611 7.33154 11.0491 7.33154C12.9821 7.33154 14.5491 8.89854 14.5491 10.8315Z"
                stroke={pathname === "/app/settings/" ? "#000" : "#676767"}
                strokeWidth="1.5"
              />
            </svg>
          }
          label="settings"
        />
        <SidebarLink
          href="/app/info/"
          icon={
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0491 21.3315C16.572 21.3315 21.0491 16.8544 21.0491 11.3315C21.0491 5.8087 16.572 1.33154 11.0491 1.33154C5.52629 1.33154 1.04913 5.8087 1.04913 11.3315C1.04913 16.8544 5.52629 21.3315 11.0491 21.3315Z"
                stroke={pathname === "/app/info/" ? "#000" : "#676767"}
                strokeWidth="1.5"
              />
              <path
                d="M9.04913 8.33154C9.04913 7.22697 9.94453 6.33154 11.0491 6.33154C12.1537 6.33154 13.0491 7.22697 13.0491 8.33154C13.0491 8.72969 12.9328 9.10067 12.7322 9.41234C12.1345 10.3412 11.0491 11.2269 11.0491 12.3315V12.8315"
                stroke={pathname === "/app/info/" ? "#000" : "#676767"}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.0413 16.3315H11.0503"
                stroke={pathname === "/app/info/" ? "#000" : "#676767"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          label="info"
        />
      </div>
    </div>
  )
}

export default Sidebar