// import { screen } from '@testing-library/react';
// import { vi } from 'vitest';

// import render from '@/utils/test/render';
// import { NotFoundPage } from '@/pages/error/components/NotFoundPage';

// // 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 (react-router-dom의 useNavigate 모킹)

// it('Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다', async () => {
//   // Arrange: NotFoundPage 컴포넌트를 렌더링
//   const { user } = await render(<NotFoundPage />);

//   // Act: "Home으로 이동" 버튼을 클릭

//   // Assert: navigate 함수가 '/' 경로와 { replace: true } 옵션으로 호출되었는지 확인
// });

import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import render from '@/utils/test/render';
import { NotFoundPage } from '@/pages/error/components/NotFoundPage';
import userEvent from '@testing-library/user-event';
import { useNavigate, MemoryRouter } from 'react-router-dom';

// react-router-dom 모듈의 useNavigate와 MemoryRouter를 모킹
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(), // useNavigate 모킹
  MemoryRouter: ({ children }) => <div>{children}</div>, // MemoryRouter도 포함
}));

it('Home으로 이동 버튼 클릭 시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  // Arrange: 모킹된 navigate 함수
  const mockNavigate = vi.fn();
  useNavigate.mockReturnValue(mockNavigate); // useNavigate가 mockNavigate를 반환하도록 설정

  // NotFoundPage 컴포넌트를 MemoryRouter로 감싸서 렌더링
  await render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  // Act: "Home으로 이동" 버튼 클릭
  await userEvent.click(screen.getByText('Home으로 이동'));

  // Assert: navigate 함수가 '/' 경로와 { replace: true } 옵션으로 호출되었는지 확인
  expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
});
