// import { screen } from '@testing-library/react';

// import customRender from '@/utils/test/render';
// import { navigateFn } from '@/utils/test/setupTests';
// import { EmptyNotice } from '../EmptyNotice';

// it('"홈으로 가기" 링크를 클릭할 경우 "/" 경로로 navigate 함수가 호출된다', async () => {
//   // Arrange: EmptyNotice 컴포넌트를 렌더링
//   const { user } = await customRender(<EmptyNotice />);

//   // Act: "홈으로 가기" 텍스트를 가진 요소를 클릭

//   // Assert: navigate 함수가 '/' 경로로 호출되었는지 확인
// });
import { screen } from '@testing-library/react';
import customRender from '@/utils/test/render';
import { vi } from 'vitest';
import { EmptyNotice } from '../EmptyNotice';
import userEvent from '@testing-library/user-event';
import { useNavigate, MemoryRouter } from 'react-router-dom';

// useNavigate와 MemoryRouter 함수 모킹
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  MemoryRouter: ({ children }) => <div>{children}</div>, // MemoryRouter도 포함
}));

it('"홈으로 가기" 링크를 클릭할 경우 "/" 경로로 navigate 함수가 호출된다', async () => {
  // Arrange: 모킹된 navigate 함수
  const mockNavigate = vi.fn();
  useNavigate.mockReturnValue(mockNavigate); // 모킹된 navigate가 반환되도록 설정

  // EmptyNotice 컴포넌트를 MemoryRouter로 감싸서 렌더링
  await customRender(
    <MemoryRouter>
      <EmptyNotice />
    </MemoryRouter>
  );

  // Act: "홈으로 가기" 버튼 클릭
  await userEvent.click(screen.getByText('홈으로 가기'));

  // Assert: navigate 함수가 '/' 경로로 호출되었는지 확인
  expect(mockNavigate).toHaveBeenCalledWith('/');
});
