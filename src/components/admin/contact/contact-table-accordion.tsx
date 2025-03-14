import {
   Accordion,
   AccordionContent,
   AccordionHeader,
   AccordionItem,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import EditButton from "../edit-button";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import {
   fetchContact,
   setSelectedContact,
} from "@/redux/features/contact-slice";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";
import CustomTooltip from "@/components/custom/tooltip";
import { Button } from "@/components/ui/button";
import axiosClient from "@/axios/axios-client";
import { DeleteDrawer } from "../delete-drawer";

export default function ContactTable({ contact }: { contact: Contact }) {
   const dispatch = useAppDispatch();
   const handleMarkDefault = async () => {
      if (!contact.default) {
         const reqBody = {
            id: contact.id,
         };
         const response = await axiosClient.put(
            "/contact/mark-as-default",
            reqBody
         );
         if (response && response.status === 200) {
            dispatch(fetchContact());
         }
      }
   };

   const handleDelete = async (id: string) => {
      try {
         const response = await axiosClient.delete("/contact", {
            params: { id },
         });
         if (response && response.status === 200) {
            dispatch(fetchContact());
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Accordion
         type="single"
         collapsible={false}
         defaultValue={contact.default ? contact.id : ""}
         asChild
      >
         <AccordionItem value={contact.id}>
            <AccordionHeader>
               <div className="flex justify-between gap-5 w-full">
                  <div className="line-clamp-2">{contact.location}</div>
                  <div className="flex gap-2 mr-3">
                     <EditButton
                        onClick={() => dispatch(setSelectedContact(contact))}
                     />
                     <CustomTooltip
                        content={
                           contact.default
                              ? "Default Address"
                              : "Mark as Default"
                        }
                        titleNode={
                           <Button
                              size="icon"
                              className="w-8 h-8 -ml-2"
                              onClick={handleMarkDefault}
                           >
                              {contact.default ? (
                                 <IoMdStar />
                              ) : (
                                 <IoIosStarOutline />
                              )}
                           </Button>
                        }
                     />
                     <DeleteDrawer
                        title={`Delete ${contact.location}`}
                        description={`Are you sure you want to delete ${contact.location}? This action cannot be undone.`}
                        onDelete={() => handleDelete(contact.id)}
                     />
                  </div>
               </div>
            </AccordionHeader>
            <AccordionContent>
               <Table>
                  <TableBody>
                     <TableRow>
                        <TableCell className="font-bold w-[120px]">
                           Location
                        </TableCell>
                        <TableCell className="font-medium whitespace-pre">
                           {contact.location}
                        </TableCell>
                     </TableRow>

                     <TableRow>
                        <TableCell className="font-bold w-[180px]">
                           Contact Number
                        </TableCell>
                        <TableCell className="font-medium whitespace-pre">
                           {contact.contactno_one}
                        </TableCell>
                     </TableRow>

                     <TableRow>
                        <TableCell className="font-bold w-[120px]">
                           Contact Number(Alt)
                        </TableCell>
                        <TableCell className="font-medium whitespace-pre">
                           {contact.contactno_two}
                        </TableCell>
                     </TableRow>

                     <TableRow>
                        <TableCell className="font-bold w-[120px]">
                           Email
                        </TableCell>
                        <TableCell className="font-medium whitespace-pre">
                           {contact.email_one}
                        </TableCell>
                     </TableRow>

                     <TableRow>
                        <TableCell className="font-bold w-[120px]">
                           Email(Alt)
                        </TableCell>
                        <TableCell className="font-medium whitespace-pre">
                           {contact.email_two}
                        </TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   );
}
