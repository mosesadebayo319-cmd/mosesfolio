import { revalidatePath } from "next/cache";
export function revalidateContent() {
  for (const path of ["/", "/case-studies", "/services", "/testimonials"])
    revalidatePath(path);
}
