import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mainAxiosInstance } from '../../api/axiosInstances';

const UserQnA = ({ userInfo }) => {
  const [userQnAs, setUserQnAs] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    mainAxiosInstance.get('/users/profile/myuserqna/', {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    })
      .then((response) => {
        const data = response.data;
        const promises = data.map((qna) =>
          mainAxiosInstance.get(`/users/qna/detail/${qna.id}`).then((res) => res.data)
        );

        Promise.all(promises).then((userAnswerData) => {
          const userQnAsWithAnswerData = data.map((qna, index) => ({
            ...qna,
            answers: userAnswerData[index],
          }));
          setUserQnAs(userQnAsWithAnswerData);
        });
      })
      .catch((error) => console.error('Error:', error));
  }, [userInfo]);

  useEffect(() => {
    mainAxiosInstance.get('/users/profile/myuseranswer/', {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    })
      .then((response) => {
        setUserAnswers(response.data);
      })
      .catch((error) => console.error('Error:', error));
  }, [userInfo]);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">나의 질문</h2>
          {userQnAs && userQnAs.map((userQnA, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
              <Link to={`/qna/detail/${userQnA.id}`}>
                <h3 className="text-lg font-semibold">{userQnA.title}</h3>
              </Link>
              {userQnA.content.length > 100 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: `${userQnA.content.substring(0, 100)}...` }}
                  className="text-black bg-white mt-2"
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: userQnA.content }}
                  className="text-black bg-white mt-2"
                />
              )}
              <small className="text-gray-500 mt-2 block">{userQnA.created_at.split('T')[0]}</small>
              <div className="mt-2">
                <span className="bg-blue-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  {userQnA.answers.answers && userQnA.answers.answers.length}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">나의 답변</h2>
          {userAnswers && userAnswers.map((userAnswer, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
              <Link to={`/qna/detail/${userAnswer.user_qna_id}`}>
                <h3 className="text-lg font-semibold">{userAnswer.title}</h3>
              </Link>
              {userAnswer.content.length > 100 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: `${userAnswer.content.substring(0, 100)}...` }}
                  className="text-black bg-white mt-2"
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: userAnswer.content }}
                  className="text-black bg-white mt-2"
                />
              )}
              <small className="text-gray-500 mt-2 block">{userAnswer.created_at.split('T')[0]}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserQnA;