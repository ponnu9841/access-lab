import { fetchContact } from "@/redux/features/contact-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import Link from "next/link";
import React, { useEffect } from "react";

export default function FooterData() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.rootReducer.contact);
  useEffect(() => {
    dispatch(fetchContact());
  }, []); //eslint-disable-line

  return (
    <>
      {data && (
        <>
          <div className="text-base">
            <Link
              href={`tel:0${data.contactno_one}`}
            >{`(+91) ${data?.contactno_one}`}</Link>
          </div>
          <div className="text-base">
            <Link href="mailto:hello@hasagency.com">{data.email_one}</Link>
          </div>
          <div className="text-base mt-2 whitespace-pre-wrap">
            {data.location}
          </div>
        </>
      )}
    </>
  );
}
