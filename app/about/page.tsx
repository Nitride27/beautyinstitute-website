import Image from "next/image";
import Link from "next/link";
import { GraduationCap, HandHeart, Building2, Compass } from "lucide-react";
import StatBlock from "@/components/stat-block";
import IconFeature from "@/components/icon-feature";
import TrainerCard from "@/components/trainer-card";
import { Reveal, RadialGroup, RadialItem, PerspectiveIn } from "@/components/motion/reveal";
import OrbitImage from "@/components/motion/orbit-image";
import ParallaxImage from "@/components/motion/parallax-image";
import { images } from "@/content/images";
import { copy } from "@/content/copy";

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 pt-10 md:grid-cols-2 md:items-center md:px-6">
        <Reveal>
          <div>
            <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
              {copy.aboutEyebrow}
            </p>
            <h1 className="mt-2 font-gascognets text-[39px] font-medium leading-[1.1]">
              {copy.aboutHeadline}
            </h1>
            <p className="mt-3 max-w-[50ch] font-basis-grotesque-pro text-[16px] leading-[1.3] text-charcoal">
              {copy.aboutBody}
            </p>
            <Link
              href="/courses"
              className="mt-5 inline-block rounded-[999px] border border-terracotta-whisper px-[19px] py-[6px] font-basis-grotesque-pro text-[16px] text-terracotta-whisper transition-colors hover:bg-terracotta-whisper hover:text-pure-white active:scale-[0.97]"
            >
              {copy.aboutCta} →
            </Link>
          </div>
        </Reveal>
        <div className="relative">
          <ParallaxImage
            src={images.aboutSalon}
            alt="Bright modern Éclat training salon with treatment beds"
            width={1000}
            height={800}
          />
          <p className="mt-2 text-right font-gascognets text-[16px] italic">
            {copy.aboutBadge}
          </p>
        </div>
      </section>

      <section className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <Reveal>
          <RadialGroup className="grid grid-cols-2 gap-6 rounded-[0px] border border-mist bg-pure-white p-6 md:grid-cols-4">
            {[
              { value: "5+", label: "Years of Excellence" },
              { value: "500+", label: "Graduates" },
              { value: "10+", label: "Expert Trainers" },
              { value: "100%", label: "Hands-on Training" },
            ].map((s, i) => (
              <RadialItem key={s.label} index={i} total={4}>
                <StatBlock value={s.value} label={s.label} />
              </RadialItem>
            ))}
          </RadialGroup>
        </Reveal>
      </section>

      <section className="mx-auto mt-[64px] grid w-full max-w-[1200px] gap-8 px-4 md:grid-cols-2 md:items-center md:px-6">
        <Reveal>
          <div>
          <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
            {copy.philosophyEyebrow}
          </p>
          <h2 className="mt-2 font-gascognets text-[30px] font-medium leading-[1.2]">
            {copy.philosophyHeadline}
          </h2>
          <p className="mt-3 max-w-[50ch] font-basis-grotesque-pro text-[16px] leading-[1.3] text-charcoal">
            {copy.philosophyBody}
          </p>
          </div>
        </Reveal>
        <div className="overflow-hidden rounded-[0px]">
          <Image
            src={images.aboutPhilosophy}
            alt="Student practicing a facial treatment"
            width={800}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
          {copy.whyEyebrow}
        </p>
        <RadialGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, title: "Expert Faculty", body: "Industry professionals with real-world experience." },
            { icon: HandHeart, title: "Hands-on Training", body: "Work with real clients and modern tools." },
            { icon: Building2, title: "Modern Facilities", body: "State-of-the-art studios and equipment." },
            { icon: Compass, title: "Career Support", body: "Guidance from enrollment to employment." },
          ].map((f, i) => (
            <RadialItem key={f.title} index={i} total={4}>
              <IconFeature icon={f.icon} title={f.title} body={f.body} />
            </RadialItem>
          ))}
        </RadialGroup>
      </section>

      <section className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <Reveal>
          <div>
            <p className="font-basisgrotesquepro-mono text-[14px] uppercase tracking-[0.056em] text-coral-pop">
              {copy.trainersEyebrow}
            </p>
            <h2 className="mt-2 font-gascognets text-[30px] font-medium leading-[1.2]">
              {copy.trainersHeadline}
            </h2>
            <p className="mt-2 max-w-[60ch] font-basis-grotesque-pro text-[16px] text-charcoal">
              {copy.trainersBody}
            </p>
          </div>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <PerspectiveIn>
            <TrainerCard
              name="Anjali Sharma"
              role="Skincare Lead"
              imageSrc={images.trainerAnjali}
              imageAlt="Portrait of trainer Anjali Sharma"
            />
          </PerspectiveIn>
          <PerspectiveIn>
            <TrainerCard
              name="Rina Maharjan"
              role="Makeup Artistry"
              imageSrc={images.trainerRina}
              imageAlt="Portrait of trainer Rina Maharjan"
            />
          </PerspectiveIn>
          <PerspectiveIn>
            <TrainerCard
              name="Sneha KC"
              role="Hair Design"
              imageSrc={images.trainerSneha}
              imageAlt="Portrait of trainer Sneha KC"
            />
          </PerspectiveIn>
        </div>
        <div className="mt-8">
          <OrbitImage
            src={images.orbitStudio}
            alt="Inside the Éclat training studio"
            width={1000}
            height={1000}
            circle
          />
        </div>
        <Link
          href="/admissions"
          className="mt-5 inline-block font-basis-grotesque-pro text-[14px] text-terracotta-whisper transition-colors hover:text-ink-black"
        >
          {copy.trainersCta} →
        </Link>
      </section>
    </>
  );
}
