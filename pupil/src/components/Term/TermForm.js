import React from "react";
import styles from "./TermDesign.module.css"; // 변경된 부분

const TermForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>이용약관</h1>
      <p className={styles.p}>
        본 이용약관(이하 "약관")은 귀하(이하 "이용자")와 [회사명](이하 "회사")
        간의 권리, 의무 및 책임사항을 규정합니다.
      </p>

      <h2 className={styles.h2}>제1조 목적</h2>
      <p className={styles.p}>
        이 약관은 회사가 제공하는 서비스의 이용조건 및 절차에 관한 기본적인
        사항을 규정함을 목적으로 합니다.
      </p>

      <h2 className={styles.h2}>제2조 정의</h2>
      <p className={styles.p}>
        1. "서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다.
        <br />
        2. "이용자"란 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를
        이용하는 회원 및 비회원을 말합니다.
      </p>

      <h2 className={styles.h2}>제3조 약관의 효력 및 변경</h2>
      <p className={styles.p}>
        1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
        공지함으로써 효력을 발생합니다.
        <br />
        2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 이 약관을
        변경할 수 있습니다.
      </p>

      <h2 className={styles.h2}>제4조 서비스의 제공 및 변경</h2>
      <p className={styles.p}>
        1. 회사는 이용자에게 아래와 같은 서비스를 제공합니다:
        <br />
        - 콘텐츠 제공 서비스
        <br />- 기타 회사가 추가 개발하거나 다른 회사와의 제휴 계약 등을 통해
        이용자에게 제공할 일체의 서비스
      </p>

      <h2 className={styles.h2}>제5조 서비스의 중단</h2>
      <p className={styles.p}>
        1. 회사는 서비스 설비의 보수, 교체, 점검, 고장 등 이유로 서비스 제공을
        일시적으로 중단할 수 있습니다.
        <br />
        2. 회사는 새로운 서비스로 교체하거나 기타 회사가 적절하다고 판단하는
        사유에 기하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다.
      </p>

      <h2 className={styles.h2}>제6조 이용자에 대한 통지</h2>
      <p className={styles.p}>
        1. 회사가 이용자에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한
        이용자가 등록한 이메일 주소로 할 수 있습니다.
        <br />
        2. 회사는 불특정 다수 이용자에 대한 통지의 경우 1주일 이상 서비스
        게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.
      </p>

      <h2 className={styles.h2}>기타 조항</h2>
      <p className={styles.p}>
        이 약관에 명시되지 않은 사항이나 해석에 대해서는 관련 법령 또는 상관례에
        따릅니다.
      </p>
    </div>
  );
};

export default TermForm;
