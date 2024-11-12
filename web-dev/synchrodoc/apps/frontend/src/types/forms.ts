import {z} from "zod";
import {
    signInValidationSchema,
    editTagsValidationSchema,
    filterValidationSchema,
    newDocumentValidationSchema,
    registrationValidationSchema,
    renameDocumentValidationSchema,
    editCollaboratorsValidationSchema,
} from "validation-schemas/src/forms";

export type SignInDetails = z.infer<typeof signInValidationSchema>;
export type RegistrationDetails = z.infer<typeof registrationValidationSchema>;
export type NewDocumentDetails = z.infer<typeof newDocumentValidationSchema>;
export type RenameDocumentDetails = z.infer<
    typeof renameDocumentValidationSchema
>;
export type EditTagsDetails = z.infer<typeof editTagsValidationSchema>;
export type FilterSortDetails = z.infer<typeof filterValidationSchema>;
export type editCollaboratorsDetails = z.infer<
    typeof editCollaboratorsValidationSchema
>;
