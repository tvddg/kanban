import React from "react";
import { ComponentPropsWithoutRef } from "react";

// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
const MockImage = (props: ComponentPropsWithoutRef<"img">) => <img {...props} />

export default MockImage;