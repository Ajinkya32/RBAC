import { Link } from "react-router-dom";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>
        <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
          {/* <AudioWaveform className="size-4" /> */}

          <svg
            width="66"
            height="66"
            viewBox="0 0 66 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M66 33.0032C66 51.2305 51.2256 66 33 66C14.7744 66 0 51.2242 0 33.0032C0 14.7821 14.7744 0 33 0C51.2256 0 66 14.7758 66 33.0032Z"
              fill="#F8DF00"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M54.4817 25.5965H51.1124C51.1124 21.4963 47.7809 18.1645 43.6811 18.1645V14.7949C49.6387 14.7949 54.4817 19.6446 54.4817 25.5965Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.6795 42.4569C22.0169 42.4569 20.6692 41.1217 20.644 39.4589V39.4463C20.644 39.4337 20.644 39.4274 20.644 39.4211V29.8792V18.1958H14.5793V38.848C14.5793 42.9104 17.0921 46.3871 20.644 47.8231C21.7587 48.2703 22.9741 48.5222 24.2463 48.5222H26.7087V42.4569C26.715 42.4569 23.7299 42.4569 23.6795 42.4569Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.0398 24.2861V24.8214H39.0335V33.3997H39.021C39.021 35.0751 37.6606 36.4292 35.9855 36.4292C34.3103 36.4292 32.9563 35.0751 32.9563 33.3997V24.8151V24.2861H26.879V33.3997C26.879 38.4321 30.9599 42.5134 35.9918 42.5134C37.0624 42.5134 38.0826 42.3181 39.0398 41.978V45.5051C39.0398 45.5114 39.0398 45.524 39.0398 45.5303V45.5429C39.0209 47.1993 37.6732 48.5409 36.0106 48.5409C35.9666 48.5409 32.9752 48.5409 32.9752 48.5409V54.6062H35.4376C36.7097 54.6062 37.9251 54.3605 39.0398 53.907C42.5918 52.4773 45.1045 49.0006 45.1045 44.9319V24.2798H39.0398V24.2861Z"
              fill="white"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
