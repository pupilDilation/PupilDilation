/**
 * module.css를 통한 style 적용 시 className을 하나로 묶어주는 함수
 * useClassNameJoin(styles.className, style.className ...)
 */
export default function useClassNameJoin(...classNames) {
  return classNames.join(" ");
}
