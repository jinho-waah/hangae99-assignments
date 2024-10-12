// import { screen } from '@testing-library/react';
// import { vi } from 'vitest';

// import render from '@/utils/test/render';
// import { ErrorPage } from '../ErrorPage';

// import userEvent from '@testing-library/user-event'; // 유저 이벤트 시뮬레이션
// import { useNavigate } from 'react-router-dom';

// // 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 (react-router-dom의 useNavigate 모킹)
// vi.mock("react-router-dom", () => {
//   return {
//     useNavigate: vi.fn()
//   }
// })

// it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
//   // Arrange: ErrorPage 컴포넌트를 렌더링
//   const { user } = await render(<ErrorPage />);

//   // Act: "뒤로 이동" 버튼을 클릭
//   await userEvent.click(screen.getByText('뒤로 이동'));
//   // Assert: navigate 함수가 -1 인자로 호출되었는지 확인
//   exppect(user.mock.pathname).eq(useNavigate(-1));
// });

import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import render from '@/utils/test/render';
import { ErrorPage } from '../ErrorPage';
import userEvent from '@testing-library/user-event';
import { useNavigate, MemoryRouter } from 'react-router-dom';

// useNavigate 함수 모킹
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(), // useNavigate 모킹
  MemoryRouter: ({ children }) => <div>{children}</div>, // MemoryRouter를 포함
}));

it('"뒤로 이동" 버튼 클릭 시 navigate(-1) 함수가 호출된다', async () => {
  // Arrange: 모킹된 navigate 함수
  const mockNavigate = vi.fn();
  useNavigate.mockReturnValue(mockNavigate); // 모킹된 navigate가 반환되도록 설정

  // ErrorPage 컴포넌트를 MemoryRouter로 감싸서 렌더링
  await render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );

  // Act: "뒤로 이동" 버튼을 클릭
  await userEvent.click(screen.getByText('뒤로 이동'));

  // Assert: navigate 함수가 -1 인자로 호출되었는지 확인
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});
