import { getImageProps } from "next/image";

// The Figma page wash is a raster asset (design.md §Backgrounds), served per viewport via <picture>.
export function PageBackground() {
  const common = { alt: "", sizes: "100vw" };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: "/images/bg-desktop.png", width: 4096, height: 2708 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: "/images/bg-mobile.png", width: 1179, height: 2556, priority: true });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source srcSet={mobile} />
      <img {...rest} alt="" aria-hidden className="pointer-events-none fixed inset-0 -z-10 size-full object-cover" />
    </picture>
  );
}
