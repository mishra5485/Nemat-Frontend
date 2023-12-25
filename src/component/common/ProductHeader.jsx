import React from 'react'

const ProductHeader = ({title}) => {
  return (
      <div className="flex w-full  justify-center items-center">
            <svg width={42} height={31} viewBox="0 0 42 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1181_21475)">
                <path d="M23.6235 3.30386C23.5451 3.34141 23.4593 3.34424 23.3784 3.37021C23.1538 3.43902 22.9304 3.51361 22.7082 3.59399C22.0544 3.8329 21.4246 4.12167 20.8439 4.48588C19.863 5.09319 19.2295 6.05424 18.9718 7.09429C18.673 8.28537 18.935 9.45749 19.2663 10.6116C19.46 11.2738 19.6486 11.9429 19.8358 12.6062C20.0158 13.2348 20.1323 13.9403 20.3983 14.536C20.3348 13.7673 20.2586 13.0009 20.2156 12.2347C20.1434 11.0178 20.0636 9.79619 20.319 8.58862C20.5408 7.56678 20.9543 6.57177 21.5334 5.66808C22.1126 4.7644 22.8653 4.05259 23.63 3.30276L23.6235 3.30386ZM20.182 15.5209C20.0664 15.1331 20.033 14.7251 19.9623 14.3295C19.7015 12.8813 19.0292 11.4982 18.2342 10.2263C17.4998 9.05183 16.5713 7.9649 15.4065 7.11073L15.3747 7.08624C14.1258 6.18061 12.2528 5.21494 10.6044 5.3079C10.7888 5.30002 11.3842 6.13266 11.4766 6.25464C12.318 7.33861 12.5748 8.67357 13.0167 9.91054C13.2277 10.4978 13.4767 11.1384 13.8766 11.645C14.2943 12.1725 14.9378 12.637 15.4638 13.0799C16.5958 14.0297 17.879 14.8154 19.0201 15.7457C19.5742 16.1957 20.0999 16.6685 20.6036 17.1632C20.8637 17.4181 21.1174 17.6741 21.3659 17.937C21.5105 18.0859 22.1067 18.5466 22.1127 18.7315C22.0975 18.4403 21.8412 18.0468 21.6848 17.7799C21.4982 17.4644 21.2872 17.159 21.0594 16.8685C19.6976 15.1488 17.8327 13.8459 16.3986 12.1927C15.9425 11.6718 15.5315 11.1131 15.2002 10.5227C15.0301 10.2223 14.8792 9.91851 14.7528 9.60453C14.6389 9.31836 14.285 8.52793 14.2725 8.21825C14.2747 8.25985 16.0876 10.6332 16.6178 11.3152C17.754 12.786 18.7503 13.0337 20.1896 15.5256L20.182 15.5209ZM25.4965 22.9324C25.0611 22.6658 24.6775 22.3303 24.2952 22.0005C23.9128 21.6708 23.4994 21.3824 23.1455 21.0298C21.9286 19.8368 20.7464 18.4938 19.1444 17.7092C18.5136 17.3984 17.8062 17.1968 17.0942 17.2239C15.9212 17.2707 14.8411 17.9432 14.2427 18.8502C14.3025 18.7559 14.7561 18.7015 14.8703 18.6757C15.1127 18.6279 15.3639 18.5904 15.6149 18.583C16.0887 18.5611 16.5312 18.6106 16.9753 18.7617C17.4985 18.9412 18.0435 19.1289 18.5408 19.3428C19.9294 19.9364 21.3655 20.5338 22.6267 21.3413C23.4554 21.8638 24.2709 22.4185 25.1904 22.8054C25.2924 22.8477 25.4008 22.8889 25.5029 22.9313L25.4965 22.9324ZM26.0558 23.7832C25.1109 23.2449 24.2244 22.6065 23.2639 22.0888C21.9594 21.3907 20.5875 20.7822 19.1513 20.3407C17.7152 19.8993 16.1078 19.5593 14.5952 19.7908C12.4314 20.1167 10.5054 21.7509 10.9651 23.8544C11.2821 25.3169 12.5859 26.7947 14.1507 27.3099C14.965 27.577 15.9558 27.5797 16.7821 27.3709C17.2363 27.2564 17.6736 27.0309 17.9596 26.6877C17.8742 26.7864 17.4203 26.8708 17.2713 26.9205C16.9966 27.004 16.7207 27.0817 16.4399 27.1362C15.9347 27.2295 15.4263 27.2454 14.919 27.1411C14.0361 26.9579 13.2316 26.4552 12.7579 25.7575C12.1579 24.8717 12.1685 23.7004 12.9783 22.9128C14.0967 21.8259 16.2582 21.6143 17.8145 21.6512C19.5448 21.694 21.2298 22.0865 22.8456 22.6229C23.5386 22.8509 24.2265 23.0859 24.9104 23.3335C25.2906 23.4657 25.7274 23.5821 26.0751 23.7799L26.0558 23.7832ZM29.7606 12.9C30.0956 13.226 30.6084 13.4192 31.1 13.4182C32.3366 13.4204 33.3394 12.3835 33.479 11.3819C33.7402 9.54362 33.0674 7.21908 30.6058 6.36112C29.3999 5.93983 28.0388 5.97715 26.7965 6.32377C24.8073 6.87743 23.3773 8.71977 23.1571 10.5629C23.0669 11.3281 23.2144 12.1482 23.3087 12.9056C23.4326 13.9277 23.5873 14.9384 23.8842 15.9306C23.9621 14.5438 24.0335 13.1581 24.6278 11.856C25.3356 10.3064 26.6908 8.80082 28.3861 8.05207C29.7228 7.46125 31.3858 7.59366 32.3357 8.71886C32.9474 9.44073 33.1055 10.4989 32.8723 11.3728C32.7717 11.744 32.3083 12.7236 31.0873 12.9826C30.6294 13.0797 30.208 12.9727 29.767 12.8989L29.7606 12.9ZM40.6219 22.4294C39.5149 22.8186 38.4539 23.3618 37.2994 23.6213C36.0063 23.9167 34.747 23.7445 33.527 23.3197C32.1079 22.8333 30.4761 22.0958 29.5247 20.9948C29.056 20.4462 28.781 19.7141 28.9982 19.0468C29.1747 18.5006 29.6793 18.0596 30.28 17.8838C30.8794 17.7022 31.5289 17.7879 32.081 18.0403C32.4634 18.2141 33.2529 18.6774 33.3541 19.0917C33.0805 17.9276 31.6666 17.1524 30.3556 17.301C28.9089 17.4671 27.4377 18.7708 27.4062 20.1256C27.3722 21.6247 29.3448 22.6211 30.6744 23.093C31.8024 23.4918 32.9883 23.7246 34.1254 24.1038C31.5418 24.4244 28.9038 23.393 27.0355 21.7608C25.6092 20.5201 24.5852 18.9519 23.8308 17.3071C23.1868 15.9012 22.6494 14.1829 22.6632 12.6513C22.6764 11.6175 22.7281 10.5771 22.9102 9.55613C23.149 8.2075 23.6778 7.06663 24.4908 5.91862C24.5311 5.8577 24.5725 5.80256 24.6128 5.74163C25.0886 5.07168 25.6057 4.37662 26.2609 3.8316C26.8491 3.34615 27.5616 2.97713 28.3278 2.76677C29.144 2.54175 29.9091 2.57743 30.7394 2.63785C31.1782 2.66997 31.6167 2.73212 32.0421 2.82652C32.8982 3.00842 33.7314 3.3022 34.4986 3.69137C35.4823 4.19304 36.3584 4.84524 37.0682 5.62213C36.7715 4.88179 36.1239 4.30405 35.4266 3.83684C33.9456 2.8394 32.1395 2.25196 30.2986 2.12633C29.2521 2.0493 28.1915 2.12464 27.1842 2.38868C25.1235 2.91871 23.1316 4.33642 22.0361 6.00101C21.1222 7.39433 20.2907 10.0208 20.4232 12.2108C20.5224 13.8369 21.2549 15.5034 22.0109 16.968C23.323 19.5178 25.2243 21.744 27.7232 23.4351C26.2003 22.9607 24.947 21.9718 23.8674 20.893C22.7878 19.8142 21.8449 18.6279 20.7033 17.6017C18.805 15.8908 16.3302 14.6573 13.6689 14.3616C11.0077 14.0659 8.17743 14.7589 6.21538 16.4113C5.25175 17.2255 4.5024 18.2666 4.17057 19.4274C3.78583 20.7772 3.98009 22.2249 4.52898 23.5274C5.87108 26.7198 9.44107 29.0114 13.2136 29.157C13.2878 29.1622 13.3607 29.1616 13.4337 29.161C13.0421 29.0067 12.4958 28.9692 12.0603 28.8586C11.5686 28.7337 11.0848 28.5834 10.6089 28.4077C8.44751 27.6178 6.6724 26.2994 5.81278 24.253C4.49701 21.1221 6.80372 18.5885 9.70282 17.2179C11.3935 16.416 13.3162 15.9878 15.2277 16.1012C15.8598 16.1359 16.4861 16.2376 17.0915 16.3968C18.1183 16.6632 18.9674 17.1881 19.8186 17.7546C20.4689 18.188 21.174 18.6298 21.7337 19.1688C22.1931 19.6112 22.7859 20.3063 23.1512 20.681C23.5229 21.0545 25.2524 22.5967 25.9784 23.011C29.4424 24.9911 33.8202 25.296 37.701 24.2296C38.0154 24.1452 40.9296 23.2218 40.8708 23.0701C40.7933 22.8616 40.7095 22.6542 40.632 22.4457L40.6219 22.4294Z" fill="#60713A" />
                <path d="M27.9508 12.5418C27.9508 12.5418 23.8929 10.8323 25.0137 17.3973C25.0137 17.3973 25.3798 12.4524 27.9508 12.5418Z" fill="#60713A" />
                </g>
                <defs>
                <clipPath id="clip0_1181_21475">
                    <rect width="35.8009" height="24.0748" fill="white" transform="matrix(-0.985394 0.170292 0.207604 0.978213 36.1406 0.810547)" />
                </clipPath>
                </defs>
            </svg>
            <h1 className="font-roxborough text-2xl  px-3">{title}</h1>
            <svg width={42} height={31} viewBox="0 0 42 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1181_21472)">
                <path d="M18.3765 3.30386C18.4549 3.34141 18.5407 3.34424 18.6216 3.37021C18.8462 3.43902 19.0696 3.51361 19.2918 3.59399C19.9456 3.8329 20.5754 4.12167 21.1561 4.48588C22.137 5.09319 22.7705 6.05424 23.0282 7.09429C23.327 8.28537 23.065 9.45749 22.7337 10.6116C22.54 11.2738 22.3514 11.9429 22.1642 12.6062C21.9842 13.2348 21.8677 13.9403 21.6017 14.536C21.6652 13.7673 21.7414 13.0009 21.7844 12.2347C21.8566 11.0178 21.9364 9.79619 21.681 8.58862C21.4592 7.56678 21.0457 6.57177 20.4666 5.66808C19.8874 4.7644 19.1347 4.05259 18.37 3.30276L18.3765 3.30386ZM21.818 15.5209C21.9336 15.1331 21.967 14.7251 22.0377 14.3295C22.2985 12.8813 22.9708 11.4982 23.7658 10.2263C24.5002 9.05183 25.4287 7.9649 26.5935 7.11073L26.6253 7.08624C27.8742 6.18061 29.7472 5.21494 31.3956 5.3079C31.2112 5.30002 30.6158 6.13266 30.5234 6.25464C29.682 7.33861 29.4252 8.67357 28.9833 9.91054C28.7723 10.4978 28.5233 11.1384 28.1234 11.645C27.7057 12.1725 27.0622 12.637 26.5362 13.0799C25.4042 14.0297 24.121 14.8154 22.9799 15.7457C22.4258 16.1957 21.9001 16.6685 21.3964 17.1632C21.1363 17.4181 20.8826 17.6741 20.6341 17.937C20.4895 18.0859 19.8933 18.5466 19.8873 18.7315C19.9025 18.4403 20.1588 18.0468 20.3152 17.7799C20.5018 17.4644 20.7128 17.159 20.9406 16.8685C22.3024 15.1488 24.1673 13.8459 25.6014 12.1927C26.0575 11.6718 26.4685 11.1131 26.7998 10.5227C26.9699 10.2223 27.1208 9.91851 27.2472 9.60453C27.3611 9.31836 27.715 8.52793 27.7275 8.21825C27.7253 8.25985 25.9124 10.6332 25.3822 11.3152C24.246 12.786 23.2497 13.0337 21.8104 15.5256L21.818 15.5209ZM16.5035 22.9324C16.9389 22.6658 17.3225 22.3303 17.7048 22.0005C18.0872 21.6708 18.5006 21.3824 18.8545 21.0298C20.0714 19.8368 21.2536 18.4938 22.8556 17.7092C23.4864 17.3984 24.1938 17.1968 24.9058 17.2239C26.0788 17.2707 27.1589 17.9432 27.7573 18.8502C27.6975 18.7559 27.2439 18.7015 27.1297 18.6757C26.8873 18.6279 26.6361 18.5904 26.3851 18.583C25.9113 18.5611 25.4688 18.6106 25.0247 18.7617C24.5015 18.9412 23.9565 19.1289 23.4592 19.3428C22.0706 19.9364 20.6345 20.5338 19.3733 21.3413C18.5446 21.8638 17.7291 22.4185 16.8096 22.8054C16.7076 22.8477 16.5992 22.8889 16.4971 22.9313L16.5035 22.9324ZM15.9442 23.7832C16.8891 23.2449 17.7756 22.6065 18.7361 22.0888C20.0406 21.3907 21.4125 20.7822 22.8487 20.3407C24.2848 19.8993 25.8922 19.5593 27.4048 19.7908C29.5686 20.1167 31.4946 21.7509 31.0349 23.8544C30.7179 25.3169 29.4141 26.7947 27.8493 27.3099C27.035 27.577 26.0442 27.5797 25.2179 27.3709C24.7637 27.2564 24.3264 27.0309 24.0404 26.6877C24.1258 26.7864 24.5797 26.8708 24.7287 26.9205C25.0034 27.004 25.2793 27.0817 25.5601 27.1362C26.0653 27.2295 26.5737 27.2454 27.081 27.1411C27.9639 26.9579 28.7684 26.4552 29.2421 25.7575C29.8421 24.8717 29.8315 23.7004 29.0217 22.9128C27.9033 21.8259 25.7418 21.6143 24.1855 21.6512C22.4552 21.694 20.7702 22.0865 19.1544 22.6229C18.4614 22.8509 17.7735 23.0859 17.0896 23.3335C16.7094 23.4657 16.2726 23.5821 15.9249 23.7799L15.9442 23.7832ZM12.2394 12.9C11.9044 13.226 11.3916 13.4192 10.9 13.4182C9.66341 13.4204 8.66063 12.3835 8.52098 11.3819C8.25982 9.54362 8.93259 7.21908 11.3942 6.36112C12.6001 5.93983 13.9612 5.97715 15.2035 6.32377C17.1927 6.87743 18.6227 8.71977 18.8429 10.5629C18.9331 11.3281 18.7856 12.1482 18.6913 12.9056C18.5674 13.9277 18.4127 14.9384 18.1158 15.9306C18.0379 14.5438 17.9665 13.1581 17.3722 11.856C16.6644 10.3064 15.3092 8.80082 13.6139 8.05207C12.2772 7.46125 10.6142 7.59366 9.66433 8.71886C9.05257 9.44073 8.89446 10.4989 9.12768 11.3728C9.22833 11.744 9.69166 12.7236 10.9127 12.9826C11.3706 13.0797 11.792 12.9727 12.233 12.8989L12.2394 12.9ZM1.37812 22.4294C2.48512 22.8186 3.54614 23.3618 4.70061 23.6213C5.99365 23.9167 7.25302 23.7445 8.47297 23.3197C9.89207 22.8333 11.5239 22.0958 12.4753 20.9948C12.944 20.4462 13.219 19.7141 13.0018 19.0468C12.8253 18.5006 12.3207 18.0596 11.72 17.8838C11.1206 17.7022 10.4711 17.7879 9.91905 18.0403C9.53658 18.2141 8.7471 18.6774 8.64588 19.0917C8.91953 17.9276 10.3334 17.1524 11.6444 17.301C13.0911 17.4671 14.5623 18.7708 14.5938 20.1256C14.6278 21.6247 12.6552 22.6211 11.3256 23.093C10.1976 23.4918 9.01174 23.7246 7.87458 24.1038C10.4582 24.4244 13.0962 23.393 14.9645 21.7608C16.3908 20.5201 17.4148 18.9519 18.1692 17.3071C18.8132 15.9012 19.3506 14.1829 19.3368 12.6513C19.3236 11.6175 19.2719 10.5771 19.0898 9.55613C18.851 8.2075 18.3222 7.06663 17.5092 5.91862C17.4689 5.8577 17.4275 5.80256 17.3872 5.74163C16.9114 5.07168 16.3943 4.37662 15.7391 3.8316C15.1509 3.34615 14.4384 2.97713 13.6722 2.76677C12.856 2.54175 12.0909 2.57743 11.2606 2.63785C10.8218 2.66997 10.3833 2.73212 9.95786 2.82652C9.10182 3.00842 8.26856 3.3022 7.50145 3.69137C6.51774 4.19304 5.64164 4.84524 4.93181 5.62213C5.22849 4.88179 5.87612 4.30405 6.57339 3.83684C8.05443 2.8394 9.86048 2.25196 11.7014 2.12633C12.7479 2.0493 13.8085 2.12464 14.8158 2.38868C16.8765 2.91871 18.8684 4.33642 19.9639 6.00101C20.8778 7.39433 21.7093 10.0208 21.5768 12.2108C21.4776 13.8369 20.7451 15.5034 19.9891 16.968C18.677 19.5178 16.7757 21.744 14.2768 23.4351C15.7997 22.9607 17.053 21.9718 18.1326 20.893C19.2122 19.8142 20.1551 18.6279 21.2967 17.6017C23.195 15.8908 25.6698 14.6573 28.3311 14.3616C30.9923 14.0659 33.8226 14.7589 35.7846 16.4113C36.7483 17.2255 37.4976 18.2666 37.8294 19.4274C38.2142 20.7772 38.0199 22.2249 37.471 23.5274C36.1289 26.7198 32.5589 29.0114 28.7864 29.157C28.7122 29.1622 28.6393 29.1616 28.5663 29.161C28.9579 29.0067 29.5042 28.9692 29.9397 28.8586C30.4314 28.7337 30.9152 28.5834 31.3911 28.4077C33.5525 27.6178 35.3276 26.2994 36.1872 24.253C37.503 21.1221 35.1963 18.5885 32.2972 17.2179C30.6065 16.416 28.6838 15.9878 26.7723 16.1012C26.1402 16.1359 25.5139 16.2376 24.9085 16.3968C23.8817 16.6632 23.0326 17.1881 22.1814 17.7546C21.5311 18.188 20.826 18.6298 20.2663 19.1688C19.8069 19.6112 19.2141 20.3063 18.8488 20.681C18.4771 21.0545 16.7476 22.5967 16.0216 23.011C12.5576 24.9911 8.17981 25.296 4.29904 24.2296C3.98465 24.1452 1.07039 23.2218 1.12918 23.0701C1.20666 22.8616 1.29055 22.6542 1.36803 22.4457L1.37812 22.4294Z" fill="#60713A" />
                <path d="M14.0492 12.5399C14.0492 12.5399 18.1071 10.8303 16.9863 17.3953C16.9863 17.3953 16.6202 12.4504 14.0492 12.5399Z" fill="#60713A" />
                </g>
                <defs>
                <clipPath id="clip0_1181_21472">
                    <rect width="35.8009" height="24.0748" fill="white" transform="matrix(0.985394 0.170292 -0.207604 0.978213 5.85938 0.810547)" />
                </clipPath>
                </defs>
            </svg>
        </div>
  )
}

export default ProductHeader