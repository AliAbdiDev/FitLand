import { ChevronRight } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

function MyButtonLink({ name = "view all", ...props }: Props) {
  return (
    <button
      className="text-seconbg-secondary max-lg:dark:text-white font-medium group"
      type="button"
      {...props}
    >
      <div className=" flex-center gap-0.5 text-secondary">
        {name}
        <span className="delay-300 transition-all duration-300 group-hover:translate-x-1">
          <ChevronRight width={20} height={20} />
        </span>
      </div>
      <span className="block w-0 h-0.5 bg-secondary max-lg:dark:bg-white group-hover:w-11/12 max-lg:w-10/12 transition-all duration-200 delay-100"></span>
    </button>
  );
}

export default MyButtonLink;
