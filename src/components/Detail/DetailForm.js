import React from "react";
import "./DetailContentMobile.css";

function DetailForm() {
  const show = {
    title: "멋진 공연",
    imageDownloaded: true,
    image: "poster_url.png",
    price: "50,000",
    place: "서울 공연장",
    introduction:
      "이 공연은 다양한 장르를 넘나드는 멋진 공연으로, 많은 이들의 사랑을 받고 있습니다.",
  };

  const schedule = "2024-07-01, 2024-07-02, 2024-07-03";

  const introductionLength = show.introduction.length;
  const marginBottom =
    introductionLength > 100
      ? "calc(100vw * 60 / 400)"
      : "calc(100vw * 40 / 400)";

  return (
    <div className="detail-container-mobile">
      <p className="event-title-mobile">{show.title}</p>
      <div>
        <div className="first-detail-mobile">
          {show.imageDownloaded ? (
            <img
              className="event-image-mobile"
              src={show.image}
              alt={show.title}
            />
          ) : (
            <img src="hello.png" alt={show.title} />
          )}
          <div className="second-detail-mobile">
            <div>
              <p className="content-title">가격</p>
              <p className="content-text">{show.price}원</p>
            </div>
            <div>
              <p className="content-title">장소</p>
              <p className="content-text">{show.place}</p>
            </div>
            <div>
              <p className="content-title">공연기간</p>
              <p className="content-text">2024.07.01~2024.07.15</p>
            </div>
          </div>
        </div>
        <div className="third-detail-mobile">
          <div>
            <p className="content-intro">소개</p>
            <p className="intro-text">{show.introduction}</p>
          </div>
          <div style={{ marginBottom }}>
            <p className="content-title">공연일정</p>
            <p className="schedule-text">{schedule}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailForm;
