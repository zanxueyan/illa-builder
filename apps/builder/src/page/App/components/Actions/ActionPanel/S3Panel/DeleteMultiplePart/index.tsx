import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { CODE_LANG } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { S3ActionPartProps } from "@/page/App/components/Actions/ActionPanel/S3Panel/interface"
import {
  codeEditorLabelStyle,
  s3ItemCodeEditorStyle,
  s3ItemStyle,
} from "@/page/App/components/Actions/ActionPanel/S3Panel/style"
import { getCachedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  DeleteMultipleContent,
  S3Action,
  S3ActionTypeContent,
} from "@/redux/currentApp/action/s3Action"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DeleteMultiplePart: FC<S3ActionPartProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cachedAction = useSelector(getCachedAction) as ActionItem<
    S3Action<S3ActionTypeContent>
  >
  const commandArgs = props.commandArgs as DeleteMultipleContent

  const handleValueChange = (value: string, name: string) => {
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...cachedAction.content,
          commandArgs: {
            ...commandArgs,
            [name]: value,
          } as DeleteMultipleContent,
        },
      }),
    )
  }

  return (
    <>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.bucket_name")}
        </span>
        <CodeEditor
          singleLine
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          value={commandArgs.bucketName}
          // TODO: refactor inline function
          modalTitle={t("editor.action.panel.s3.bucket_name")}
          onChange={(value) => handleValueChange(value, "bucketName")}
          expectValueType={VALIDATION_TYPES.STRING}
        />
      </div>
      <div css={s3ItemStyle}>
        <span css={codeEditorLabelStyle}>
          {t("editor.action.panel.s3.object_key_list")}
        </span>
        <CodeEditor
          singleLine
          wrapperCss={s3ItemCodeEditorStyle}
          lang={CODE_LANG.JAVASCRIPT}
          placeholder={t("editor.action.panel.s3.placeholder.object_key_list")}
          value={commandArgs.objectKeyList}
          modalTitle={t("editor.action.panel.s3.object_key_list")}
          onChange={(value) => handleValueChange(value, "objectKeyList")}
          expectValueType={VALIDATION_TYPES.ARRAY}
        />
      </div>
    </>
  )
}

DeleteMultiplePart.displayName = "DeleteMultiplePart"
