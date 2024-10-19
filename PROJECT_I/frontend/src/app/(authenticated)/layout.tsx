import Navigationbar from "@/components/navigationbar";
import Footer from "@/components/footer";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigationbar />
      {children}
      <Footer />
    </>
  );
}
