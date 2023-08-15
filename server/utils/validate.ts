import { BaseSchema, parse, ParseInfo, ValiError, Issue } from 'valibot';
import type { H3Event } from 'h3';
import { createError, readBody } from 'h3';

const DEFAULT_ERROR_MESSAGE = 'Bad Request';
const DEFAULT_ERROR_STATUS = 400;

function createBadRequest(error: any) {
  return createError({
    statusCode: DEFAULT_ERROR_STATUS,
    statusText: DEFAULT_ERROR_MESSAGE,
    data: error
  });
}

export async function useValidateParams<TSchema extends BaseSchema>(
  event: H3Event,
  schema: TSchema,
  info?: ParseInfo
) {
  try {
    const params = getRouterParams(event);

    return parse(schema, params, info);
  } catch (error) {
    const errors: Record<string, string> = {};
    if (error instanceof ValiError) {
      processIssues(error.issues, errors);
      console.log(errors);
    }

    throw createBadRequest(error);
  }
}

export async function useValidateBody<TSchema extends BaseSchema>(
  event: H3Event,
  schema: TSchema,
  info?: ParseInfo
) {
  try {
    const body = await readBody(event);
    // console.log('parse');
    return parse(schema, body, info);
  } catch (error) {
    const errors: Record<string, string> = {};
    if (error instanceof ValiError) {
      processIssues(error.issues, errors);
      console.log(errors);
    }

    throw createBadRequest(error);
  }
}

/**
 * Source from: https://github.com/logaretm/vee-validate/
 * @param issues
 * @param errors
 */
function processIssues(issues: Issue[], errors: any): void {
  issues.forEach((issue) => {
    const path = normalizeFormPath(
      (issue.path || []).map((p) => p.key).join('.')
    );

    if (issue.issues?.length) {
      processIssues(
        issue.issues.flatMap((ue) => ue.issues || []),
        errors
      );

      if (!path) {
        return;
      }
    }

    if (!errors[path]) {
      errors[path] = errors;
    }

    errors[path] = issue.message;
    //  errors[path].errors.push(issue.message);
  });
}

export function isIndex(value: unknown): value is number {
  return Number(value) >= 0;
}
/**
 * Constructs a path with dot paths for arrays to use brackets to be compatible with vee-validate path syntax
 */
export function normalizeFormPath(path: string): string {
  const pathArr = path.split('.');
  if (!pathArr.length) {
    return '';
  }

  let fullPath = String(pathArr[0]);
  for (let i = 1; i < pathArr.length; i++) {
    if (isIndex(pathArr[i])) {
      fullPath += `[${pathArr[i]}]`;
      continue;
    }

    fullPath += `.${pathArr[i]}`;
  }

  return fullPath;
}
