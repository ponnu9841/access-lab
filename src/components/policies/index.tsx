import { formatPolicyName, getPolicy } from "@/utils";
import parse from "html-react-parser";

export default function Policies({
  policies,
  type,
}: {
  policies: Policy[] | null;
  type: string;
}) {
  const currentPolicy = getPolicy(policies, type);
  return (
    <div className="container my-32">
      <h1 className="text-3xl mb-4">{formatPolicyName(type)}</h1>
      {currentPolicy && <div>{parse(currentPolicy.content)}</div>}
    </div>
  );
}
