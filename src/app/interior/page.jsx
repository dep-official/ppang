import Nav from "@/components/Nav/Nav";
import Gallery from "@/components/Gallery/Gallery";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page blueprints">
        <Gallery />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
