import { Library } from "lucide-react"
import Button from "../../../components/ui/Button"

function UploadActions({ handleUpload, uploading, setKbOpen }: {
    handleUpload: () => void;
    uploading: boolean;
    setKbOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className="flex gap-3">
            <Button className="flex-1" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload & Index"}
            </Button>

            <Button
                variant="secondary"
                onClick={() => setKbOpen(true)}
                className="flex items-center gap-2"
            >
                <Library size={16} />
                Manage Knowledge Base
            </Button>
        </div>
    )
}

export default UploadActions