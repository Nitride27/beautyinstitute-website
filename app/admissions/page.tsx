import { MapPin, Phone, Mail } from "lucide-react";
import AdmissionsForm from "@/components/admissions-form";
import ContactMethodRow from "@/components/contact-method-row";
import MapCard from "@/components/map-card";
import { Reveal } from "@/components/motion/reveal";
import { copy } from "@/content/copy";

export default function AdmissionsPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 pt-10 md:grid-cols-2 md:px-6">
        <div>
          <p className="font-basisgrotesquepro-mono text-[12px] uppercase tracking-[0.056em] text-stone">
            {copy.admissionsKicker}
          </p>
          <h1 className="mt-2 font-gascognets text-[39px] font-medium leading-[1.1]">
            {copy.admissionsHeadline}
          </h1>
          <p className="mt-3 max-w-[50ch] font-basis-grotesque-pro text-[16px] text-charcoal">
            {copy.admissionsBody}
          </p>
          <div className="mt-8 space-y-4">
            <Reveal>
              <div className="space-y-4">
                <ContactMethodRow icon={MapPin} label={copy.visitLabel} value={copy.visitValue} />
                <ContactMethodRow icon={Phone} label={copy.callLabel} value={copy.callValue} href="tel:+9779801234567" />
                <ContactMethodRow icon={Mail} label={copy.emailLabel} value={copy.emailValue} href="mailto:hello@eclat.institute" />
              </div>
            </Reveal>
          </div>
          <p className="mt-8 font-basis-grotesque-pro text-[14px]">{copy.followLabel}</p>
        </div>
        <div className="rounded-[0px] border border-mist bg-pure-white p-6">
          <Reveal>
            <AdmissionsForm />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-[64px] w-full max-w-[1200px] px-4 md:px-6">
        <Reveal>
          <MapCard />
        </Reveal>
      </section>
    </>
  );
}
