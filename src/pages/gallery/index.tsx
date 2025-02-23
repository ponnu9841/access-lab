import ZoomAnimation from "@/components/animation/zoom-animation";
import GalleryDialog from "@/components/gallery-dialog";
import NextImage from "@/components/Image";
import Layout from "@/components/layout";
import { Pagination } from "@/components/pagination";
import BannerPages from "@/components/section/banner-pages";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGallery, setPageNo } from "@/redux/features/gallery-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const dispatch = useAppDispatch();
  const { loading, pageNo, gallery } = useAppSelector(
    (state) => state.rootReducer.gallery
  );
  const lastPage = gallery?.last_page;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchGallery({ controller, pageNo, pageSize: 12 }));
    return () => controller.abort();
  }, [pageNo]);

  const openDialog = (id: string) => setSelectedImage(id);

  return (
    <>
      <BannerPages image="/banner-page.jpg" title="Gallery" />

      <div className="container my-12">
        {loading &&
          Array(6)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="aspect-square" />
            ))}
        {!loading && gallery?.data.length === 0 && (
          <div className="col-span-4 text-center mt-3 text-red-500">
            No Record Found
          </div>
        )}

        {!loading && gallery?.data.length && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {gallery?.data.map((image, index) => (
              <div
                key={index}
                className="group aspect-square relative cursor-pointer"
                onClick={() => openDialog(image.id)}
              >
                <div className="absolute inset-0 rounded-sm bg-black bg-opacity-0 group-hover:bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex justify-center items-center">
                  <div className="p-3 rounded-full bg-background">
                    <LinkIcon size={15} />
                  </div>
                </div>
                <ZoomAnimation className="aspect-square">
                  <NextImage
                    src={image.image}
                    className="rounded-sm overflow-hidden"
                    imageClassName="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </ZoomAnimation>
              </div>
            ))}
          </div>
        )}

        {!loading && gallery?.data.length ? (
          <div className="mt-6 flex justify-center">
            <Pagination
              pageNo={pageNo}
              setPageNo={(pageNo) => dispatch(setPageNo(pageNo))}
              totalPages={lastPage || 1}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      {gallery?.data.length && (
        <GalleryDialog
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={gallery?.data}
        />
      )}
    </>
  );
}

GalleryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
