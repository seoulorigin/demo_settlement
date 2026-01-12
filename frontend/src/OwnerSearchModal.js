import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const OwnerSearchModal = ({ show, handleClose, onSelectOwner }) => {
  // 검색 조건 상태
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  
  // 가짜 데이터 (나중에 Spring API에서 받아온 데이터로 대체)
  const [owners, setOwners] = useState([
    { id: 11, name: '김철수', email: 'chulsoo@example.com' },
    { id: 10, name: '이영희', email: 'younghee@test.co.kr' },
    { id: 9, name: '박민수', email: 'minsoo@store.com' },
  ]);

  const handleSearch = () => {
    // TODO: 여기서 Spring Boot API 호출 (axios.get)
    console.log(`검색 요청: 이름=${searchName}, 이메일=${searchEmail}`);
    alert('실제 구현 시 API를 호출하여 데이터를 갱신합니다.');
  };

  const handleSelect = (owner) => {
    onSelectOwner(owner.id); // 부모 컴포넌트에 선택한 ID 전달
    handleClose(); // 모달 닫기
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>업주정보 검색하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formOwnerName">
            <Form.Label>업주 이름</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="선택사항입니다." 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formOwnerEmail" className="mt-3">
            <Form.Label>업주 이메일</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="선택사항입니다." 
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="outline-success" onClick={handleSearch}>
              검색
            </Button>
          </div>
        </Form>

        <hr />

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>업주 번호</th>
              <th>업주 이름</th>
              <th>업주 이메일</th>
              <th>선택</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.id}>
                <td>{owner.id}</td>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelect(owner)}>
                    선택
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        {/* 페이지네이션 UI (단순 모양만 구현) */}
        <div className="w-100 d-flex justify-content-center">
             <Button variant="light" size="sm">«</Button>
             <Button variant="primary" size="sm" className="mx-1">1</Button>
             <Button variant="light" size="sm">2</Button>
             <Button variant="light" size="sm">3</Button>
             <Button variant="light" size="sm">»</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OwnerSearchModal;