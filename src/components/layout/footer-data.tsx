import { fetchContact } from "@/redux/features/contact-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import Link from "next/link";
import React, { useEffect } from "react";

export default function FooterData() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.rootReducer.contact);
  useEffect(() => {
    const controller = new AbortController()
    dispatch(fetchContact(controller));
    return () => controller.abort();
  }, []); //eslint-disable-line

  const defautlContact = data?.find((item) => item.default === true);

  return (
    <>
      {defautlContact && (
        <>
          <div className="text-base">
            <Link
              href={`tel:0${defautlContact.contactno_one}`}
            >{`(+91) ${defautlContact?.contactno_one}`}</Link>
          </div>
          <div className="text-base">
            <Link href="mailto:hello@hasagency.com">{defautlContact.email_one}</Link>
          </div>
          <div className="text-base mt-2 whitespace-pre-wrap">
            {defautlContact.location}
          </div>
        </>
      )}
    </>
  );
}
