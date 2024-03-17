import Bun from '../../assets/svgs/bun.svg?react';
import Deno from '../../assets/svgs/deno.svg?react';
import Node from '../../assets/svgs/nodejs.svg?react';

export const Header = () => {
  return (
    <header className="flex max-w-screen min-h-fit items-center justify-center">
      <div className="flex justify-center items-center p-2 gap-4">
        <Bun className="h-10 w-10" />
        <span>vs</span>
        <Deno className="h-10 w-10" />
        <span>vs</span>
        <Node className="h-10 w-10" />
      </div>
    </header>
  );
};
