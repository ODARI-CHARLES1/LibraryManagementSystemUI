import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuListFilter } from "react-icons/lu";
import { useContext, useEffect } from "react";
import appContext from "../../Contexts/AppContext";
import type { SubmitHandler } from "react-hook-form";
import { bookAPI } from "../../Features/Books/bookAPI";

export interface bookId {
  book_id: number;
}

const bookIdSchema: yup.ObjectSchema<bookId> = yup
  .object({
    book_id: yup.number().required("Book ID is required"),
  })
  .required();

const BookSearch = () => {
  const { bookSearchIdActive, theme, setBook, setBookSearchIdActive } =
    useContext(appContext);

  const { handleSubmit, register, reset } = useForm<bookId>({
    resolver: yupResolver(bookIdSchema),
    defaultValues: {
      book_id: undefined,
    },
  });

  const [triggerGetBook, { data, error, isLoading }] =
    bookAPI.useLazyGetBookByIdQuery();

  useEffect(() => {
    if (data) {
      setBook([data]);
    }
  }, [data, setBook]);

  const onSubmit: SubmitHandler<bookId> = async (id) => {
    if (bookSearchIdActive) {
      triggerGetBook(id.book_id);
      reset();
    }
  };

  return (
    <div className="flex items-center gap-4">
      {bookSearchIdActive && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("book_id")}
              className={`${
                theme === "light"
                  ? "outline-green-400 border-2 border-gray-400"
                  : "outline-gray-700 border-2 border-gray-500"
              } text-gray-600 px-2 py-1 rounded-full`}
              placeholder="Search book by id"
              type="number"
            />
          </form>

          {isLoading && (
            <p className="text-sm text-green-500">Loading...</p>
          )}

          {error && (
            <p className="text-sm text-red-500">Book not found</p>
          )}

          {data && (
            <p className="text-sm text-green-600">
              Found: {data.title}
            </p>
          )}
        </>
      )}

      <LuListFilter
        onClick={() => setBookSearchIdActive(!bookSearchIdActive)}
        className={`${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        } hover:text-green-400 cursor-pointer duration-500 hover:scale-120`}
      />
    </div>
  );
};

export default BookSearch;
