import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./@/components/ui/label";
import { Button } from "./@/components/ui/button";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./@/components/ui/form";

import { Input } from "./@/components/ui/input";

const formSchema = z.object({
  code: z.string().min(2, {
    message: "Code must be at least 2 characters.",
  }),
  fileInput: z
    .object({
      file: z.string().refine(
        (data) => {
          // Assuming "data" is a Buffer or a similar type representing the file data
          return data.length > 0; // Adjust the condition as needed
        },
        {
          message: "File is required.",
        }
      ),
    })
    .refine((data) => !!data, {
      message: "File is required.",
    }),
});

const Uploader = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      fileInput: {
        file: "", // Set default file data if needed
      },
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("hello");
    try {
      const formData = new FormData();
      //   formData.append("textInput", values.code);
      formData.append("file", values.fileInput.file.toString());
      console.log(values.fileInput.file);

      const response = await axios.post(
        `http://localhost:8000/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            code: values.code, // Assuming you want to pass the code in headers
          },
        }
      );
      //  const response = await fetch("http://localhost:8000/api/upload", {
      //    method: "POST",
      //    body: formData,
      //    headers: {
      //      code: values.code,
      //    },
      //  });

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(values);
  };
  return (
    <>
      <div className="bg-zinc-950 font-main text-gray-100 font-medium dark:bg-white h-[100vh] w-[100vw] flex justify-center align-middle text-center items-center flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 border-[1px] border-slate-300 py-16 px-8 border-opacity-30 rounded-md"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Code" {...field} />
                  </FormControl>

                  {/* <div className="flex flex-row w-full max-w-sm items-center gap-5 mt-16">
                    <div className=" min-w-[5rem]">
                      <Label htmlFor="picture">Upload File</Label>
                    </div>
                    <Input id="picture" type="file" />
                  </div> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileInput.file"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row w-full max-w-sm items-center gap-5 mt-2">
                    <Label htmlFor="fileInput.file">Upload File</Label>
                    <Input
                      id="fileInput.file"
                      type="file"
                      {...field}
                      //   onChange={(e) => {
                      //     field.onChange(e); // Trigger the field's onChange
                      //     form.setValue("fileInput.file", e.target.files[0]); // Manually set the field value
                      //   }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Uploader;
