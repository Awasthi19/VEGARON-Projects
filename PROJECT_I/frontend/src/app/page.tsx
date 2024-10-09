"use client";
import Navigationbar from "@/components/navigationbar";
import { useTheme } from "next-themes";
import { Grid } from "@/components/grid";
import Footer from "@/components/footer";
import Members from "@/components/members";

export default function Home() {
  return (
    <div>
      
      <Grid />
      <Members />
      
    </div>
  );
}
