import z from "zod";
import i18n from "@/i18n";

const errorMap: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.too_small:
      if (error.type === "number") {
        return { message: `${i18n.t('validation.number-too-small')} ${error.minimum} ${i18n.t('validation.characters-long')}`};
      }
      break;
    case z.ZodIssueCode.too_big:
      if (error.type === "number") {
        return { message: `${i18n.t('validation.number-too-big')} ${error.maximum} ${i18n.t('validation.characters-long')}`};
      }
      break;
    case z.ZodIssueCode.invalid_string:
      if (error.validation === "email") {
        return { message: `${i18n.t('validation.invalid-email')}`};
      }
      break;
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(errorMap);


// base
const tagName = z.string().min(3).max(15);
const collaboratorsSchema = z.array(z.object({
  email: z.string().email(),
  permission: z.enum(["READ", "WRITE"])
}));

const tagsSchema = z.array(z.object({
  name: tagName,
  color: z.string(),
}));


// composite
export const signInValidationSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(8),
});

export const registrationValidationSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
}).refine((data) => data.password === data.passwordConfirm, {
  message: i18n.t("validation.password-dont-match"),
  path: ["passwordConfirm"],
});

export const newDocumentValidationSchema = z.object({
  title: z.string().min(3).max(40),
  collaborators: collaboratorsSchema,
  tags: tagsSchema,
});

export const renameDocumentValidationSchema = z.object({
  title: z.string().min(3).max(40),
});

export const editTagsValidationSchema = z.object({
  tags: tagsSchema,
});

export const editCollaboratorsValidationSchema = z.object({
  collaborators: collaboratorsSchema,
})

export const filterValidationSchema = z.object({
  filterFromDate: z.date().optional(),
  filterToDate: z.date().optional(),
  filterTags: z.string().optional()
    .refine((tags) => tags ? 
      tags.replaceAll("/,\s*/g", ",").split(",").every((tag) => tagName.safeParse(tag).success)
      :
      true, {
      message: i18n.t("validation.tags-comma-separated"),
    }),
});
