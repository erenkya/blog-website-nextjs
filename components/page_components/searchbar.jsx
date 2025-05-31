import { Input } from "@/components/ui/input";

export default function SearchBar() {
    return (
        <div className="w-full max-w-sm">
            <Input type="text" placeholder="Search..." />
        </div>
    );
}
