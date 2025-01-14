import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FOOTER_DATA = [
  {
    title: "Sports Products",
    items: ["Football", "Dumbbells", "Running Shoes"],
  },
  {
    title: "Categories",
    items: ["Running", "Bodybuilding", "Team Sports"],
  },
  {
    title: "Brands",
    items: ["Nike", "Adidas", "Puma"],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-secondary text-white pt-12 max-sm:pt-10 pb-5 px-[4%] space-y-7 mt-20">
      <div className=" flex items-center justify-between max-sm:flex-col-reverse w-full">
        <ul className="grid grid-cols-3 gap-5 w-1/2 *:space-y-2 max-md:text-sm max-sm:hidden">
          {FOOTER_DATA?.map((list, index) => (
            <li key={index}>
              <h3 className="text-white font-medium">{list?.title}</h3>
              <ul className="text-zinc-400 space-y-2">
                {list?.items.map((item, itemIndex) => (
                  <Link href={"/"} key={itemIndex} className="block">
                    <li>{item}</li>
                  </Link>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="space-y-4 w-full flex-center pt-7 pb-5 sm:hidden">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="3"
          >
            {FOOTER_DATA.map((accardion, index) => (
              <AccordionItem value={String(index)} key={index} className="py-2 border-zinc-500">
                <AccordionTrigger className="py-2.5 text-[15px] leading-6 hover:no-underline text-white">
                  {accardion?.title}
                </AccordionTrigger>
                {accardion?.items?.map((content, index) => (
                  <Link href={"/"} key={index}>
                    <AccordionContent className="pb-3 text-zinc-400">
                      {content}
                    </AccordionContent>
                  </Link>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="max-sm:w-full w-1/2 flex items-end justify-center max-sm:items-center flex-col gap-3">
          <div className="space-y-5">
            <p className="text-base">Follow us for more discounts!</p>
            <ul className="flex-center gap-9">
              <li className="">
                <Link
                  href={"https://github.com/AliAbdiDev"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center text-start w-full"
                >
                  <svg
                    width="27px"
                    height="27px"
                    viewBox="0 -3.5 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMinYMin meet"
                  >
                    <g fill="#ffff">
                      <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />
                      <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />
                    </g>
                  </svg>
                </Link>
              </li>
              <li className="">
                <Link
                  href={"mailto:aliabdidev@gmail.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center  text-start w-full"
                >
                  <svg
                    width="27px"
                    height="27px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                      stroke="#ffff"
                      stroke-width="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="#ffff"
                      stroke-width="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </li>
              <li className="">
                <Link
                  href={"https://t.me/ALI_Abdiy"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center  text-start w-full"
                >
                  <svg
                    fill="#ffff"
                    width="27px"
                    height="27px"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>telegram</title>
                    <path d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031zM15.93 1.025c-8.302 0.020-15.025 6.755-15.025 15.060 0 8.317 6.742 15.060 15.060 15.060s15.060-6.742 15.060-15.060c0-8.305-6.723-15.040-15.023-15.060h-0.002q-0.035-0-0.070 0z" />
                  </svg>
                </Link>
              </li>
              <li className="">
                <Link href={"#"}>
                  <Image
                    src={"/svg/linkedin-svgrepo-com(4).svg"}
                    alt="linkedin"
                    width={27}
                    className="text-black"
                    height={27}
                  />
                </Link>
              </li>
            </ul>
          </div>

          <form className="space-y-2 pt-2 max-sm:w-full w-3/4">
            <Label htmlFor="f1d5" className="text-white text-base font-medium">
              Fitland newsletter
            </Label>
            <div className="flex gap-2">
              <Input
                id={"f1d5"}
                className="flex-1 w-full"
                placeholder="Email"
                type="email"
              />
              <Button variant="default" className="">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-zinc-500 pt-3">
        <p className="space-x-1">
          <span className="text-zinc-300">Made by</span>
          <span className="text-blue-300 *:px-1">
            <Link href={"/"} className="underline">
              Ali Abdi
            </Link>{" "}
            of{" "}
            <Link href={"/"} className="underline">
              Loratech team
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
