import { FC, useState } from "react"
import { PenIcon, Trigger } from "@illa-design/react"
import { AppNameEditModal } from "@/page/App/components/PageNavBar/AppNameEditModal"
import { AppNameProps } from "@/page/App/components/PageNavBar/interface"
import { nameContainerStyle, nameStyle, triggerStyle } from "./style"

export const AppName: FC<AppNameProps> = (props) => {
  const { appName } = props

  const [popContentVisible, setPopContentVisible] = useState<boolean>(false)

  const handleOnSuccess = () => {
    setPopContentVisible(false)
  }

  return (
    <Trigger
      _css={triggerStyle}
      trigger="click"
      content={<AppNameEditModal onSuccess={handleOnSuccess} />}
      popupVisible={popContentVisible}
      onVisibleChange={setPopContentVisible}
      position="bottom-start"
      showArrow={false}
      withoutPadding
      colorScheme="white"
    >
      <div css={nameContainerStyle}>
        <span css={nameStyle}>{appName}</span>
        <PenIcon size="16px" />
      </div>
    </Trigger>
  )
}
