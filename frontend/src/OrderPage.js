import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Badge } from 'react-bootstrap';
import OwnerSearchModal from './OwnerSearchModal';

const OrderPage = () => {
  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);

  // 검색 필터 상태
  const [filters, setFilters] = useState({
    ownerId: '',
    orderId: '',
    status: 'ALL',
    startDate: '',
    endDate: ''
  });

  // 주문 목록 데이터 (가짜 데이터)
  const [orders, setOrders] = useState([
    {
      ownerId: 1,
      orderNo: '202101291530649d-e1d4-4',
      amount: 3000,
      status: '배달완료',
      date: '2021년 01월 03일 00시 12분 00초'
    },
    {
      ownerId: 2,
      orderNo: '202101291530649d-xxxx-x',
      amount: 15000,
      status: '주문취소',
      date: '2021년 01월 04일 12시 30분 00초'
    }
  ]);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // 모달에서 업주 선택 시 호출되는 함수
  const handleSelectOwner = (id) => {
    setFilters({ ...filters, ownerId: id });
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">주문 조회</h2>
      
      <div className="alert alert-warning" role="alert">
        🙏 주문금액은 총 주문된 금액이 아닌, 정산 대금을 계산할 때 사용되는 금액입니다. (예를 들어 사장님 쿠폰은 금액에서 제외됨)
      </div>

      {/* 검색 필터 영역 */}
      <div className="bg-light p-3 rounded mb-4 border">
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>업주 번호</Form.Label>
              <div className="d-flex">
                <Form.Control 
                  type="text" 
                  name="ownerId" 
                  placeholder="선택사항" 
                  value={filters.ownerId} 
                  onChange={handleInputChange} 
                />
                <Button variant="outline-primary" className="ms-2" onClick={() => setShowModal(true)}>
                  검색
                </Button>
              </div>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>주문번호</Form.Label>
              <Form.Control 
                type="text" 
                name="orderId" 
                placeholder="선택사항" 
                value={filters.orderId} 
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>주문상태</Form.Label>
              <Form.Select name="status" value={filters.status} onChange={handleInputChange}>
                <option value="ALL">전체보기</option>
                <option value="COMPLETE">배달완료</option>
                <option value="CANCEL">주문취소</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
             <Form.Label>기간 설정</Form.Label>
             <div className="d-flex align-items-center">
                <Form.Control type="date" name="startDate" onChange={handleInputChange}/>
                <span className="mx-2">~</span>
                <Form.Control type="date" name="endDate" onChange={handleInputChange}/>
             </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
            <Button variant="outline-danger" className="me-2">초기화</Button>
            <Button variant="success">검색</Button>
        </div>
      </div>

      {/* 결과 테이블 영역 */}
      <Table responsive hover className="align-middle">
        <thead className="bg-light">
          <tr>
            <th>업주 번호</th>
            <th>주문 번호</th>
            <th>주문 금액</th>
            <th>주문 상태</th>
            <th>주문 일시</th>
            <th>결제 내역</th>
            <th>주문 상태</th>
            <th>주문 상태변경</th>
            <th>주문 삭제</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td>{order.ownerId}</td>
              <td>{order.orderNo}</td>
              <td>{order.amount.toLocaleString()}원</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td><Button variant="outline-info" size="sm">결제 내역</Button></td>
              <td><Button variant="outline-primary" size="sm">주문 상태</Button></td>
              <td><Button variant="outline-success" size="sm">주문 상태변경</Button></td>
              <td><Button variant="outline-danger" size="sm">주문 삭제</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 업주 검색 모달 컴포넌트 */}
      <OwnerSearchModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        onSelectOwner={handleSelectOwner} 
      />
    </Container>
  );
};

export default OrderPage;