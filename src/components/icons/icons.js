import colors from "../../assets/styles/variables/_colors.module.scss";
const main = colors["main-color-1"];
const light = colors["main-color-1-light"];
const dark = colors["main-color-1-dark"];
const contrastText = colors["main-color-1-contrast"];

const getColor = (lightness) => {
  switch (lightness) {
    case "main":
      return main;
    case "dark":
      return dark;
    case "light":
      return light;
    case "contrastText":
      return contrastText;
    default:
      return main;
  }
};

export const lightnessEnum = {
  main: "main",
  light: "light",
  dark: "dark",
  contrastText: "contrastText",
};

export const LevelDeterminePic = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="61.000000pt"
      height="76.000000pt"
      viewBox="0 0 61.000000 76.000000"
      preserveAspectRatio="xMidYMid meet"
      {...rest}
    >
      <g
        transform="translate(0.000000,76.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          fill={getColor(lightness)}
          d="M379 721 c-88 -28 -154 -70 -218 -135 -100 -105 -145 -221 -144 -371
            1 -59 7 -111 20 -150 l19 -60 277 -3 277 -2 -2 367 -3 368 -85 2 c-59 2 -102
            -3 -141 -16z"
        />
      </g>
    </svg>
  );
};

export const BookmarkIcon = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      width="15"
      height="19"
      viewBox="0 0 15 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.0347 17.9862C1.13138 18.0101 1.2324 18.0101 1.32907 17.9862C1.45967 17.9902 1.58874 17.9572 1.70137 17.891L7.74466 13.4235L13.8053 17.891C14.0047 18.0327 14.2663 18.052 14.4844 17.9411C14.7025 17.8302 14.8411 17.6075 14.8442 17.3629V3.80443C14.8395 2.07543 13.439 0.674984 11.71 0.670227H3.81392C2.09498 0.674858 0.698657 2.05961 0.679722 3.77845V17.4062C0.67719 17.6515 0.815045 17.8768 1.0347 17.9862ZM1.97847 3.77845C1.97847 2.76473 2.80025 1.94295 3.81397 1.94295H11.7101C12.7218 1.94769 13.5408 2.7667 13.5456 3.77845V16.0815L8.15163 12.0901C7.92348 11.9184 7.60922 11.9184 7.38107 12.0901L1.97847 16.0815V3.77845Z"
        fill={getColor(lightness)}
      />
    </svg>
  );
};

export const ProfileIcon = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.79761 5.66235C3.79761 8.58248 6.16484 10.9497 9.08496 10.9497C12.003 10.9446 14.3673 8.58038 14.3723 5.66235C14.3723 2.74223 12.0051 0.375 9.08496 0.375C6.16484 0.375 3.79761 2.74223 3.79761 5.66235ZM5.17688 5.66232C5.17688 3.50396 6.92657 1.75427 9.08493 1.75427C11.2412 1.75933 12.9879 3.50606 12.993 5.66232C12.993 7.82067 11.2433 9.57036 9.08493 9.57036C6.92657 9.57036 5.17688 7.82067 5.17688 5.66232Z"
        fill={getColor(lightness)}
      />
      <path
        d="M17.3605 18.306C16.9817 18.301 16.6758 17.9951 16.6709 17.6163C16.6658 13.9365 13.684 10.9547 10.0042 10.9497H8.16511C4.48532 10.9547 1.50352 13.9365 1.49845 17.6163C1.49845 17.9972 1.18968 18.306 0.808796 18.306C0.42791 18.306 0.119141 17.9972 0.119141 17.6163C0.124208 13.1747 3.72355 9.57541 8.16511 9.57034H10.0042C14.4458 9.57541 18.0451 13.1747 18.0502 17.6163C18.0452 17.9951 17.7393 18.301 17.3605 18.306Z"
        fill={getColor(lightness)}
      />
    </svg>
  );
};

export const NoteIcon = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_403_63)">
        <path
          d="M18.4592 12.5638C18.1841 12.5638 17.9611 12.7868 17.9611 13.062V17.4846C17.9601 18.3096 17.2918 18.9781 16.4668 18.9789H2.49052C1.66553 18.9781 0.99718 18.3096 0.996207 17.4846V4.50449C0.99718 3.67971 1.66553 3.01116 2.49052 3.01018H6.91313C7.18826 3.01018 7.41124 2.7872 7.41124 2.51208C7.41124 2.23715 7.18826 2.01398 6.91313 2.01398H2.49052C1.11567 2.01553 0.00155657 3.12965 0 4.50449V17.4848C0.00155657 18.8596 1.11567 19.9737 2.49052 19.9753H16.4668C17.8416 19.9737 18.9558 18.8596 18.9573 17.4848V13.062C18.9573 12.7868 18.7343 12.5638 18.4592 12.5638Z"
          fill={getColor(lightness)}
        />
        <path
          d="M18.76 0.732339C17.8846 -0.143039 16.4654 -0.143039 15.59 0.732339L6.70352 9.61882C6.64262 9.67972 6.59865 9.75521 6.57569 9.8381L5.40709 14.057C5.35903 14.23 5.40787 14.4152 5.53473 14.5423C5.66179 14.6691 5.84702 14.718 6.01999 14.6701L10.2389 13.5013C10.3218 13.4783 10.3973 13.4344 10.4582 13.3735L19.3445 4.48679C20.2185 3.61083 20.2185 2.19279 19.3445 1.31683L18.76 0.732339ZM7.78884 9.94258L15.0617 2.66949L17.4073 5.01506L10.1342 12.2881L7.78884 9.94258ZM7.32032 10.8828L9.19423 12.7569L6.60215 13.475L7.32032 10.8828ZM18.6401 3.78244L18.1118 4.31071L15.7661 1.96495L16.2945 1.43669C16.7808 0.950454 17.5692 0.950454 18.0554 1.43669L18.6401 2.02118C19.1256 2.508 19.1256 3.29582 18.6401 3.78244Z"
          fill={getColor(lightness)}
        />
      </g>
      <defs>
        <clipPath id="clip0_403_63">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const HomeIcon = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2045 16.64H4.36406C2.21349 16.64 0.463867 14.8902 0.463867 12.7394V7.26983C0.463867 6.06095 1.03768 4.90154 1.99879 4.1684L6.41901 0.796715C7.81167 -0.265572 9.75689 -0.265572 11.1496 0.796715L12.5545 1.86742V1.03774C12.5888 0.175192 13.8205 0.175842 13.8545 1.03774V3.18016C13.8545 3.42729 13.7144 3.65303 13.4929 3.76274C13.2715 3.87241 13.007 3.84699 12.8105 3.69724L10.3613 1.83072C9.43269 1.12238 8.13581 1.12238 7.2074 1.83056L2.78718 5.20224C2.14648 5.69095 1.76393 6.46388 1.76393 7.26983V12.7394C1.76393 14.1733 2.93035 15.3398 4.36406 15.3398H13.2045C14.6382 15.3398 15.8046 14.1733 15.8046 12.7394V7.26983C15.8046 6.454 15.4264 5.67844 14.7929 5.19516C14.5074 4.97741 14.4525 4.56947 14.6703 4.28402C14.888 3.99853 15.2959 3.94363 15.5813 4.16138C16.5352 4.88896 17.1047 6.051 17.1047 7.26983V12.7394C17.1047 14.8902 15.3551 16.64 13.2045 16.64ZM7.48433 7.50598C7.03558 7.50598 6.67178 7.86981 6.67178 8.3186C6.71472 9.39678 8.25433 9.39597 8.29687 8.3186C8.29687 7.86977 7.93308 7.50598 7.48433 7.50598ZM10.8971 8.3187C10.8541 9.39688 9.31455 9.39607 9.272 8.3187C9.31494 7.24051 10.8545 7.24136 10.8971 8.3187ZM8.29687 10.9193C8.25394 11.9975 6.71433 11.9967 6.67178 10.9193C6.71472 9.8411 8.25433 9.84194 8.29687 10.9193ZM10.8971 10.9193C10.8541 11.9975 9.31455 11.9967 9.272 10.9193C9.31494 9.8411 10.8545 9.84194 10.8971 10.9193Z"
        fill={getColor(lightness)}
      />
    </svg>
  );
};

export const LeitnerIcon = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 24 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.58549 16.34H19.2634C20.4703 16.3117 21.4339 15.3249 21.4335 14.1175V5.12326C21.4335 4.69106 21.0832 4.3407 20.6511 4.3407H4.13527C3.70547 4.34632 3.3584 4.69341 3.35278 5.12326V14.1175C3.35278 14.7088 3.58834 15.2757 4.00736 15.6928C4.42637 16.1099 4.9943 16.3428 5.58549 16.34ZM4.96985 14.1175V5.90576H19.9206V14.1175C19.9206 14.4805 19.6263 14.7748 19.2633 14.7748H5.63757C5.27284 14.7749 4.97555 14.4822 4.96985 14.1175Z"
        fill={getColor(lightness)}
      />
      <path
        d="M15.3614 11.1229C14.9292 11.1229 14.5789 10.7725 14.5789 10.3403V5.26927L13.16 1.56513H2.90411L4.80295 4.69539C4.9784 4.93461 5.00351 5.25248 4.86779 5.51628C4.73207 5.78008 4.45887 5.94444 4.16225 5.94074C3.86563 5.93705 3.5966 5.76592 3.4675 5.49882L0.859198 1.17906C0.712624 0.938803 0.712624 0.636761 0.859198 0.3965C0.992626 0.152256 1.24863 0.000238283 1.52692 5.72395e-08H13.7025C14.0261 -0.000123235 14.3163 0.198939 14.4328 0.500842L16.1334 4.84147C16.1707 4.93059 16.1885 5.02664 16.1856 5.12319V10.3403C16.189 10.5562 16.1018 10.7638 15.9452 10.9125C15.7886 11.0612 15.5768 11.1375 15.3614 11.1229Z"
        fill={getColor(lightness)}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4345 5.90576H20.6511C20.9615 5.89776 21.2369 5.70454 21.3501 5.41536L23.1238 1.07473C23.2191 0.832539 23.1879 0.558771 23.0403 0.344341C22.8963 0.128023 22.6533 -0.00137706 22.3934 1.24921e-05H17.1768C16.8559 -0.00179469 16.5663 0.192619 16.4465 0.490419L14.7146 4.83104C14.6102 5.07064 14.6379 5.34725 14.7876 5.56144C14.9316 5.77775 15.1747 5.90715 15.4345 5.90576ZM20.1293 4.34068H16.5924L17.7088 1.56519H21.2352L20.1293 4.34068Z"
        fill={getColor(lightness)}
      />
    </svg>
  );
};

export const ExtraIcon = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      width="30"
      height="17"
      viewBox="0 0 30 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.34456 16.42H22.0475C26.4499 16.2386 29.9255 12.6165 29.9255 8.21C29.9255 3.80346 26.4499 0.181376 22.0475 0H8.34456C3.94217 0.181376 0.466553 3.80346 0.466553 8.21C0.466553 12.6165 3.94217 16.2386 8.34456 16.42ZM2.50916 8.20993C2.50916 4.93912 5.07768 2.24487 8.34446 2.08899H22.0474C25.3142 2.24487 27.8827 4.93912 27.8827 8.20993C27.8827 11.4807 25.3142 14.175 22.0474 14.3309H8.34446C5.07768 14.175 2.50916 11.4807 2.50916 8.20993Z"
        fill={getColor(lightness)}
      />
      <path
        d="M7.80151 11.5037C7.22469 11.5037 6.75708 11.036 6.75708 10.4591V5.93283C6.75708 5.35596 7.22469 4.88831 7.80151 4.88831C8.37834 4.88831 8.84595 5.35596 8.84595 5.93283V10.4591C8.83845 11.0329 8.3752 11.4962 7.80151 11.5037Z"
        fill={getColor(lightness)}
      />
      <path
        d="M10.0574 9.23359H5.53149C4.95467 9.23359 4.48706 8.76594 4.48706 8.18906C4.48706 7.61218 4.95467 7.14453 5.53149 7.14453H10.0574C10.6342 7.14453 11.1018 7.61218 11.1018 8.18906C11.1018 8.76594 10.6342 9.23359 10.0574 9.23359Z"
        fill={getColor(lightness)}
      />
      <path
        d="M22.5906 11.5316C22.0169 11.5241 21.5536 11.0608 21.5461 10.4871V5.96079C21.5461 5.38391 22.0138 4.91626 22.5906 4.91626C23.1674 4.91626 23.635 5.38391 23.635 5.96079V10.4871C23.635 11.064 23.1674 11.5316 22.5906 11.5316Z"
        fill={getColor(lightness)}
      />
      <path
        d="M24.8606 9.26142H20.3347C19.7579 9.26142 19.2903 8.79377 19.2903 8.21689C19.2903 7.64002 19.7579 7.17236 20.3347 7.17236H24.8606C25.4374 7.17236 25.905 7.64001 25.905 8.21689C25.905 8.79377 25.4374 9.26142 24.8606 9.26142Z"
        fill={getColor(lightness)}
      />
    </svg>
  );
};

export const ChatIcon = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.61769 18.6C1.52409 18.6 1.42972 18.5819 1.33981 18.5447C1.06836 18.4322 0.891357 18.1673 0.891357 17.8734L0.891757 9.38789C0.834329 1.07968 10.9438 -3.14448 16.8005 2.74395C22.5951 8.62392 18.4115 18.6073 10.1472 18.6C8.68331 18.6 7.28581 18.2717 5.99358 17.624C4.75882 17.0051 3.2639 17.2547 2.27363 18.2451L2.13153 18.3872C1.99256 18.5262 1.80672 18.6 1.61769 18.6ZM4.56988 15.8337C5.27536 15.8337 5.9851 15.9943 6.64467 16.3249C7.73498 16.8714 8.91674 17.148 10.1555 17.1469C17.1 17.1571 20.6588 8.67328 15.7682 3.76635C10.8074 -1.19853 2.30881 2.3576 2.34477 9.37735L2.34481 9.38436L2.34448 16.398C3.0329 16.0258 3.79875 15.8337 4.56988 15.8337ZM7.10279 10.2083C7.60432 10.2083 8.01089 9.80173 8.01089 9.30015C8.01089 8.79858 7.60432 8.39197 7.10279 8.39197C5.89854 8.43963 5.89821 10.1605 7.10279 10.2083ZM10.2265 8.39197C9.72499 8.39197 9.31842 8.79858 9.31842 9.30016C9.36626 10.5049 11.087 10.5045 11.1346 9.30016C11.1346 8.79858 10.728 8.39197 10.2265 8.39197ZM12.4422 9.30016C12.4422 8.79858 12.8488 8.39197 13.3503 8.39197C13.8519 8.39197 14.2584 8.79858 14.2584 9.30016C14.2108 10.5045 12.4901 10.5049 12.4422 9.30016Z"
        fill={getColor(lightness)}
      />
    </svg>
  );
};

export const BackIcon = ({ lightness = "main", ...rest }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M25 0H5C2.24312 0 0 2.24312 0 5V25C0 27.7569 2.24312 30 5 30H25C27.7569 30 30 27.7569 30 25V20C30 19.31 29.44 18.75 28.75 18.75C28.06 18.75 27.5 19.31 27.5 20V25C27.5 26.3787 26.3787 27.5 25 27.5H5C3.62125 27.5 2.5 26.3787 2.5 25V5C2.5 3.62125 3.62125 2.5 5 2.5H25C26.3787 2.5 27.5 3.62125 27.5 5V10C27.5 10.69 28.06 11.25 28.75 11.25C29.44 11.25 30 10.69 30 10V5C30 2.24312 27.7569 0 25 0Z"
        fill={getColor(lightness)}
      />
      <path
        d="M17.7461 9.10437C17.2518 8.6225 16.4599 8.63312 15.9786 9.1275L11.9811 13.2319C11.5093 13.7044 11.2493 14.3319 11.2493 14.9994C11.2493 15.6675 11.5093 16.295 11.9699 16.7556L15.9793 20.8719C16.223 21.1237 16.5486 21.25 16.8736 21.25C17.188 21.25 17.503 21.1325 17.7461 20.8956C18.2405 20.4137 18.2511 19.6225 17.7693 19.1281L13.7599 14.9887L17.7693 10.8725C18.2505 10.3775 18.2405 9.58625 17.7461 9.10437Z"
        fill={getColor(lightness)}
      />
    </svg>
  );
};
