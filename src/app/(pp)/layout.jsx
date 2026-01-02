import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";

export default function PPLayout({ children }) {
  return (
    <>
      <Nav />
      <div className='page max-w-[800px] mx-auto overscroll-y-auto h-full w-full mb-[72px]'>
        {children}
      </div>
      <ConditionalFooter />
    </>
  );
}
