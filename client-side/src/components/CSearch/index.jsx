import CButton from '../CButton';

export default function CSearch() {
  return (
    <form className=" flex flex-col justify-center items-start gap-2 w-[300px] h-10 border-[0.6px] border-black border-solid rounded-xl box-border  bg-[rgba(222,216,225,0.12)]">
      <div className=" flex flex-row justify-start items-center gap-2 w-[100%] h-[100%] px-6 py-2.5 box-border">
        <CButton type="submit">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7556 20L12.1556 14.4C11.7111 14.7556 11.2 15.037 10.6222 15.2444C10.0444 15.4519 9.42963 15.5556 8.77778 15.5556C7.16296 15.5556 5.7963 14.9963 4.67778 13.8778C3.55926 12.7593 3 11.3926 3 9.77778C3 8.16296 3.55926 6.7963 4.67778 5.67778C5.7963 4.55926 7.16296 4 8.77778 4C10.3926 4 11.7593 4.55926 12.8778 5.67778C13.9963 6.7963 14.5556 8.16296 14.5556 9.77778C14.5556 10.4296 14.4519 11.0444 14.2444 11.6222C14.037 12.2 13.7556 12.7111 13.4 13.1556L19 18.7556L17.7556 20ZM8.77778 13.7778C9.88889 13.7778 10.8333 13.3889 11.6111 12.6111C12.3889 11.8333 12.7778 10.8889 12.7778 9.77778C12.7778 8.66667 12.3889 7.72222 11.6111 6.94444C10.8333 6.16667 9.88889 5.77778 8.77778 5.77778C7.66667 5.77778 6.72222 6.16667 5.94444 6.94444C5.16667 7.72222 4.77778 8.66667 4.77778 9.77778C4.77778 10.8889 5.16667 11.8333 5.94444 12.6111C6.72222 13.3889 7.66667 13.7778 8.77778 13.7778Z"
              fill="#FEF7FF"
              fillOpacity="0.4"
            />
          </svg>
        </CButton>

        <input
          className="w-full bg-transparent border-none outline-none text-white placeholder-[rgba(254,247,255,0.4)]"
          placeholder="Search . . ."
        />
      </div>
    </form>
  );
}
